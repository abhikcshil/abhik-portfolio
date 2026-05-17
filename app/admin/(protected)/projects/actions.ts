"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/cms/auth";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import {
  createCmsDbProject,
  getCmsDbProjectById,
  getCmsDbProjectBySlug,
  updateCmsDbProject,
  type CmsDbProjectInput,
} from "@/src/lib/cms/dbProjects";
import {
  CONTENT_VISIBILITIES,
  PROJECT_STATUSES,
  URL_SAFE_SLUG_PATTERN,
  type ProjectFormState,
} from "@/src/lib/cms/projectForm";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";
import { getPublicPortfolioCacheTag } from "@/src/lib/portfolio/publicData";

function getTrimmedString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function splitCommaSeparated(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildOptionalLinks(formData: FormData) {
  const links = {
    live: getTrimmedString(formData, "linkLive"),
    github: getTrimmedString(formData, "linkGithub"),
    demo: getTrimmedString(formData, "linkDemo"),
    caseStudy: getTrimmedString(formData, "linkCaseStudy"),
  };

  return Object.values(links).some(Boolean) ? links : undefined;
}

function buildOptionalContent(formData: FormData) {
  const content = {
    overview: getTrimmedString(formData, "contentOverview"),
    problem: getTrimmedString(formData, "contentProblem"),
    solution: getTrimmedString(formData, "contentSolution"),
    features: splitLines(getTrimmedString(formData, "contentFeatures")),
    technicalDetails: splitLines(
      getTrimmedString(formData, "contentTechnicalDetails")
    ),
    challenges: splitLines(getTrimmedString(formData, "contentChallenges")),
    lessons: splitLines(getTrimmedString(formData, "contentLessons")),
    futurePlans: splitLines(getTrimmedString(formData, "contentFuturePlans")),
  };

  return Object.values(content).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  )
    ? content
    : undefined;
}

export async function saveProjectAction(
  _previousState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const session = await requireAdmin();
  const currentAdmin =
    session.user.githubUsername ?? session.user.email ?? "github-admin";
  let didUpdateExistingProject = false;
  let savedProjectId = "";
  let previousProjectSlug: string | null = null;
  let nextProjectSlug = "";
  let revalidateDomainPaths: string[] = [];

  try {
    const projectId = getTrimmedString(formData, "projectId");
    const title = getTrimmedString(formData, "title");
    const shortTitle = getTrimmedString(formData, "shortTitle");
    const slug = getTrimmedString(formData, "slug").toLowerCase();
    const tagline = getTrimmedString(formData, "tagline");
    const summary = getTrimmedString(formData, "summary");
    const status = getTrimmedString(formData, "status");
    const visibility = getTrimmedString(formData, "visibility");
    const enabled = formData.get("enabled") === "on";

    const fieldErrors: NonNullable<ProjectFormState["fieldErrors"]> = {};

    if (!title) {
      fieldErrors.title = "Title is required.";
    }

    if (!slug) {
      fieldErrors.slug = "Slug is required.";
    } else if (!URL_SAFE_SLUG_PATTERN.test(slug)) {
      fieldErrors.slug =
        "Slug must be URL-safe and use lowercase letters, numbers, and hyphens only.";
    }

    if (!tagline) {
      fieldErrors.tagline = "Tagline is required.";
    }

    if (!summary) {
      fieldErrors.summary = "Summary is required.";
    }

    if (!PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])) {
      fieldErrors.status = "Choose a valid project status.";
    }

    if (
      !CONTENT_VISIBILITIES.includes(
        visibility as (typeof CONTENT_VISIBILITIES)[number]
      )
    ) {
      fieldErrors.visibility = "Choose a valid visibility state.";
    }

    const domains = await getCmsDbDomains();
    const allowedDomainIds = new Set(domains.map((domain) => domain.id));
    const selectedDomainIds = new Set(
      formData
        .getAll("domains")
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    );

    const placements = [...selectedDomainIds].map((domainId) => {
      const rawOrder = getTrimmedString(formData, `domainOrder.${domainId}`);
      const parsedOrder = Number(rawOrder);

      return {
        domainId,
        order: parsedOrder,
        featured: formData.get(`domainFeatured.${domainId}`) === "on",
        labelOverride: getTrimmedString(
          formData,
          `domainLabelOverride.${domainId}`
        ),
        rawOrder,
      };
    });

    if (visibility === "public" && placements.length === 0) {
      fieldErrors.domains =
        "Public projects need at least one selected domain placement.";
    }

    if (
      placements.some(
        (placement) =>
          !allowedDomainIds.has(placement.domainId) ||
          !placement.rawOrder ||
          !Number.isFinite(placement.order) ||
          placement.order <= 0
      )
    ) {
      fieldErrors.domainOrders =
        "Each selected domain needs a positive numeric placement order.";
    }

    const existingProject = projectId
      ? await getCmsDbProjectById(projectId)
      : null;
    previousProjectSlug = existingProject?.slug ?? null;

    if (projectId && !existingProject) {
      return {
        message:
          "That project could not be found in the CMS database anymore. Refresh the page and try again.",
      };
    }

    const projectWithSlug = slug ? await getCmsDbProjectBySlug(slug) : null;
    if (projectWithSlug && projectWithSlug.id !== projectId) {
      fieldErrors.slug = "That slug is already being used by another project.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        message: "Fix the highlighted fields and save again.",
        fieldErrors,
      };
    }

    const projectInput: CmsDbProjectInput = {
      id: projectId || slug,
      slug,
      title,
      shortTitle: shortTitle || undefined,
      tagline,
      summary,
      status: status as CmsDbProjectInput["status"],
      enabled,
      visibility: visibility as CmsDbProjectInput["visibility"],
      techStack: splitCommaSeparated(getTrimmedString(formData, "techStack")),
      highlights: splitLines(getTrimmedString(formData, "highlights")),
      links: buildOptionalLinks(formData),
      content: buildOptionalContent(formData),
      domains: placements.map((placement) => ({
        domainId: placement.domainId,
        order: placement.order,
        featured: placement.featured,
        labelOverride: placement.labelOverride || undefined,
      })),
      createdBy: existingProject?.cms.createdBy ?? currentAdmin,
      updatedBy: currentAdmin,
    };
    nextProjectSlug = projectInput.slug;
    revalidateDomainPaths = domains
      .filter((domain) => {
        const isCurrentlySelected = selectedDomainIds.has(domain.id);
        const wasPreviouslySelected = existingProject?.domains.some(
          (placement) => placement.domainId === domain.id
        );

        return isCurrentlySelected || wasPreviouslySelected;
      })
      .map((domain) => `/${domain.slug}`);

    if (projectId) {
      await updateCmsDbProject(projectId, projectInput);
      didUpdateExistingProject = true;
      savedProjectId = projectId;
    } else {
      const createdProject = await createCmsDbProject(projectInput);
      savedProjectId = createdProject.id;
    }
  } catch (error) {
    return {
      message: getDatabaseSetupErrorMessage(error),
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidateTag(getPublicPortfolioCacheTag(), "max");
  if (savedProjectId) {
    revalidatePath(`/admin/projects/${savedProjectId}/edit`);
  }
  if (previousProjectSlug) {
    revalidatePath(`/projects/${previousProjectSlug}`);
  }
  if (nextProjectSlug) {
    revalidatePath(`/projects/${nextProjectSlug}`);
  }
  for (const domainPath of revalidateDomainPaths) {
    revalidatePath(domainPath);
  }

  redirect(`/admin/projects?saved=${didUpdateExistingProject ? "updated" : "created"}`);
}
