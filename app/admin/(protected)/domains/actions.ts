"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/cms/auth";
import {
  createCmsDbDomain,
  getCmsDbDomainById,
  getCmsDbDomainBySlug,
  updateCmsDbDomain,
  type CmsDbDomainInput,
} from "@/src/lib/cms/dbDomains";
import { getCmsDbProjects } from "@/src/lib/cms/dbProjects";
import {
  CONTENT_VISIBILITIES,
  URL_SAFE_SLUG_PATTERN,
  type DomainFormState,
} from "@/src/lib/cms/domainForm";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";
import { getPublicPortfolioCacheTag } from "@/src/lib/portfolio/publicData";

function getTrimmedString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalNumber(value: string) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export async function saveDomainAction(
  _previousState: DomainFormState,
  formData: FormData
): Promise<DomainFormState> {
  const session = await requireAdmin();
  const currentAdmin =
    session.user.githubUsername ?? session.user.email ?? "github-admin";
  let didUpdateExistingDomain = false;
  let savedDomainId = "";
  let previousDomainSlug: string | null = null;
  let nextDomainSlug = "";
  let previousDomainHref: string | null = null;
  let nextDomainHref = "";
  let affectedProjectSlugs: string[] = [];

  try {
    const domainId = getTrimmedString(formData, "domainId");
    const label = getTrimmedString(formData, "label");
    const shortLabel = getTrimmedString(formData, "shortLabel");
    const slug = getTrimmedString(formData, "slug").toLowerCase();
    const description = getTrimmedString(formData, "description");
    const visibility = getTrimmedString(formData, "visibility");
    const enabled = formData.get("enabled") === "on";
    const orderValue = getTrimmedString(formData, "order");
    const order = Number(orderValue);
    const href = getTrimmedString(formData, "href");
    const orbitRadius = getOptionalNumber(
      getTrimmedString(formData, "orbitRadius")
    );
    const orbitDuration = getOptionalNumber(
      getTrimmedString(formData, "orbitDuration")
    );
    const planetSize = getOptionalNumber(
      getTrimmedString(formData, "planetSize")
    );
    const initialAngle = getOptionalNumber(
      getTrimmedString(formData, "initialAngle")
    );

    const fieldErrors: NonNullable<DomainFormState["fieldErrors"]> = {};

    if (!label) {
      fieldErrors.label = "Label is required.";
    }

    if (!slug) {
      fieldErrors.slug = "Slug is required.";
    } else if (!URL_SAFE_SLUG_PATTERN.test(slug)) {
      fieldErrors.slug =
        "Slug must be URL-safe and use lowercase letters, numbers, and hyphens only.";
    }

    if (!description) {
      fieldErrors.description = "Description is required.";
    }

    if (!Number.isFinite(order) || order <= 0) {
      fieldErrors.order = "Order must be a positive number.";
    }

    if (
      !CONTENT_VISIBILITIES.includes(
        visibility as (typeof CONTENT_VISIBILITIES)[number]
      )
    ) {
      fieldErrors.visibility = "Choose a valid visibility state.";
    }

    if (
      [orbitRadius, orbitDuration, planetSize, initialAngle].some(
        (value) => Number.isNaN(value)
      )
    ) {
      fieldErrors.order =
        fieldErrors.order ??
        "Optional orbit and size fields must be numeric when provided.";
    }

    const existingDomain = domainId
      ? await getCmsDbDomainById(domainId)
      : null;
    previousDomainSlug = existingDomain?.slug ?? null;
    previousDomainHref = existingDomain?.href ?? null;

    if (domainId && !existingDomain) {
      return {
        message:
          "That domain could not be found in the CMS database anymore. Refresh the page and try again.",
      };
    }

    const domainWithSlug = slug ? await getCmsDbDomainBySlug(slug) : null;
    if (domainWithSlug && domainWithSlug.id !== domainId) {
      fieldErrors.slug = "That slug is already being used by another domain.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        message: "Fix the highlighted fields and save again.",
        fieldErrors,
      };
    }

    const domainInput: CmsDbDomainInput = {
      id: domainId || slug,
      label,
      shortLabel: shortLabel || undefined,
      slug,
      description,
      enabled,
      visibility: visibility as CmsDbDomainInput["visibility"],
      order,
      href: href || undefined,
      color: getTrimmedString(formData, "color") || undefined,
      glowColor: getTrimmedString(formData, "glowColor") || undefined,
      gradient: getTrimmedString(formData, "gradient") || undefined,
      orbitRadius,
      orbitDuration,
      planetSize,
      initialAngle,
      createdBy: existingDomain?.cms.createdBy ?? currentAdmin,
      updatedBy: currentAdmin,
    };
    nextDomainSlug = domainInput.slug;
    nextDomainHref = domainInput.href?.trim() || `/${domainInput.slug}`;

    const projects = await getCmsDbProjects();
    const affectedProjects = projects.filter((project) =>
      project.domains.some(
        (placement) => placement.domainId === (domainId || domainInput.id)
      )
    );
    affectedProjectSlugs = affectedProjects.map((project) => project.slug);

    if (domainId) {
      await updateCmsDbDomain(domainId, domainInput);
      didUpdateExistingDomain = true;
      savedDomainId = domainId;
    } else {
      const createdDomain = await createCmsDbDomain(domainInput);
      savedDomainId = createdDomain.id;
    }
  } catch (error) {
    return {
      message: getDatabaseSetupErrorMessage(error),
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/domains");
  revalidatePath("/");
  revalidateTag(getPublicPortfolioCacheTag(), "max");
  if (savedDomainId) {
    revalidatePath(`/admin/domains/${savedDomainId}/edit`);
  }
  if (previousDomainHref) {
    revalidatePath(previousDomainHref);
  }
  if (previousDomainSlug) {
    revalidatePath(`/${previousDomainSlug}`);
  }
  if (nextDomainHref) {
    revalidatePath(nextDomainHref);
  }
  if (nextDomainSlug) {
    revalidatePath(`/${nextDomainSlug}`);
  }
  for (const projectSlug of affectedProjectSlugs) {
    revalidatePath(`/projects/${projectSlug}`);
  }

  redirect(
    `/admin/domains?saved=${didUpdateExistingDomain ? "updated" : "created"}`
  );
}
