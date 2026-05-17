import type {
  DomainId,
  PortfolioDomain,
  PortfolioProject,
  ProjectDomainPlacement,
} from "./schema";

export function normalizeDomain(domain: PortfolioDomain): PortfolioDomain {
  const slug = domain.slug.trim().toLowerCase();

  return {
    ...domain,
    slug,
    label: domain.label.trim(),
    shortLabel: domain.shortLabel?.trim() || undefined,
    description: domain.description.trim(),
    href: domain.href.trim() || `/${slug}`,
  };
}

export function normalizeProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    slug: project.slug.trim().toLowerCase(),
    title: project.title.trim(),
    shortTitle: project.shortTitle?.trim() || undefined,
    tagline: project.tagline.trim(),
    summary: project.summary.trim(),
    techStack: [...project.techStack],
    highlights: [...project.highlights],
    domains: [...project.domains].sort((left, right) => left.order - right.order),
    content: project.content
      ? {
          ...project.content,
          features: project.content.features
            ? [...project.content.features]
            : undefined,
          technicalDetails: project.content.technicalDetails
            ? [...project.content.technicalDetails]
            : undefined,
          challenges: project.content.challenges
            ? [...project.content.challenges]
            : undefined,
          lessons: project.content.lessons
            ? [...project.content.lessons]
            : undefined,
          futurePlans: project.content.futurePlans
            ? [...project.content.futurePlans]
            : undefined,
        }
      : undefined,
  };
}

export function isPublicDomain(domain: PortfolioDomain): boolean {
  return domain.enabled && domain.visibility === "public";
}

export function getProjectPlacement(
  project: PortfolioProject,
  domainId: DomainId | string
): ProjectDomainPlacement | null {
  return (
    project.domains.find((placement) => placement.domainId === domainId) ?? null
  );
}

export function getProjectDisplayTitle(
  project: PortfolioProject,
  domainId?: DomainId | string
): string {
  const placement = domainId ? getProjectPlacement(project, domainId) : null;
  return placement?.labelOverride ?? project.shortTitle ?? project.title;
}

export function hasPublicProjectPlacement(
  project: PortfolioProject,
  publicDomains: PortfolioDomain[]
): boolean {
  const publicDomainIds = new Set(publicDomains.map((domain) => domain.id));

  return project.domains.some((placement) => publicDomainIds.has(placement.domainId));
}

export function isPublicProject(
  project: PortfolioProject,
  publicDomains: PortfolioDomain[]
): boolean {
  return (
    project.enabled &&
    project.visibility === "public" &&
    hasPublicProjectPlacement(project, publicDomains)
  );
}
