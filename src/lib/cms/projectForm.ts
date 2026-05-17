import type {
  ContentVisibility,
  PortfolioProject,
  ProjectStatus,
} from "@/src/lib/portfolio/schema";
import {
  CONTENT_VISIBILITIES,
  PROJECT_STATUSES,
} from "@/src/data/portfolio/types";

export { CONTENT_VISIBILITIES, PROJECT_STATUSES };

export const URL_SAFE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ProjectFormFieldErrors = Partial<
  Record<
    | "title"
    | "slug"
    | "tagline"
    | "summary"
    | "status"
    | "visibility"
    | "domains"
    | "domainOrders",
    string
  >
>;

export type ProjectFormState = {
  message?: string;
  fieldErrors?: ProjectFormFieldErrors;
};

export const INITIAL_PROJECT_FORM_STATE: ProjectFormState = {};

export type ProjectFormPlacementValue = {
  domainId: string;
  order: string;
  featured: boolean;
  labelOverride: string;
};

export type ProjectFormValues = {
  projectId?: string;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  visibility: ContentVisibility;
  enabled: boolean;
  techStack: string;
  highlights: string;
  links: {
    live: string;
    github: string;
    demo: string;
    caseStudy: string;
  };
  content: {
    overview: string;
    problem: string;
    solution: string;
    features: string;
    technicalDetails: string;
    challenges: string;
    lessons: string;
    futurePlans: string;
  };
  placements: ProjectFormPlacementValue[];
};

function joinLines(values?: string[]) {
  return values?.join("\n") ?? "";
}

export function createProjectFormValues(
  project?: PortfolioProject
): ProjectFormValues {
  return {
    projectId: project?.id,
    title: project?.title ?? "",
    shortTitle: project?.shortTitle ?? "",
    slug: project?.slug ?? "",
    tagline: project?.tagline ?? "",
    summary: project?.summary ?? "",
    status: project?.status ?? "building",
    visibility: project?.visibility ?? "draft",
    enabled: project?.enabled ?? true,
    techStack: project?.techStack.join(", ") ?? "",
    highlights: joinLines(project?.highlights),
    links: {
      live: project?.links?.live ?? "",
      github: project?.links?.github ?? "",
      demo: project?.links?.demo ?? "",
      caseStudy: project?.links?.caseStudy ?? "",
    },
    content: {
      overview: project?.content?.overview ?? "",
      problem: project?.content?.problem ?? "",
      solution: project?.content?.solution ?? "",
      features: joinLines(project?.content?.features),
      technicalDetails: joinLines(project?.content?.technicalDetails),
      challenges: joinLines(project?.content?.challenges),
      lessons: joinLines(project?.content?.lessons),
      futurePlans: joinLines(project?.content?.futurePlans),
    },
    placements:
      project?.domains.map((placement) => ({
        domainId: placement.domainId,
        order: String(placement.order),
        featured: placement.featured ?? false,
        labelOverride: placement.labelOverride ?? "",
      })) ?? [],
  };
}
