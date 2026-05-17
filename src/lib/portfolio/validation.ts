import { portfolioDomains, portfolioProjects } from "@/src/data/portfolio";
import { normalizeDomain, normalizeProject, isPublicDomain } from "./normalize";

export type PortfolioValidationIssue = {
  level: "error" | "warning";
  message: string;
  itemType?: "domain" | "project";
  itemId?: string;
};

export type PortfolioValidationResult = {
  valid: boolean;
  issues: PortfolioValidationIssue[];
};

const URL_SAFE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePortfolioData(): PortfolioValidationResult {
  const issues: PortfolioValidationIssue[] = [];
  const domains = portfolioDomains.map(normalizeDomain);
  const projects = portfolioProjects.map(normalizeProject);
  const publicDomains = domains.filter(isPublicDomain);
  const publicDomainIds = new Set(publicDomains.map((domain) => domain.id));
  const seenDomainIds = new Set<string>();
  const seenDomainSlugs = new Set<string>();
  const seenProjectIds = new Set<string>();
  const seenProjectSlugs = new Set<string>();

  for (const domain of domains) {
    if (seenDomainIds.has(domain.id)) {
      issues.push({
        level: "error",
        message: `Duplicate domain id "${domain.id}".`,
        itemType: "domain",
        itemId: domain.id,
      });
    }

    if (seenDomainSlugs.has(domain.slug)) {
      issues.push({
        level: "error",
        message: `Duplicate domain slug "${domain.slug}".`,
        itemType: "domain",
        itemId: domain.id,
      });
    }

    if (!URL_SAFE_SLUG_PATTERN.test(domain.slug)) {
      issues.push({
        level: "error",
        message: `Domain slug "${domain.slug}" is not URL-safe.`,
        itemType: "domain",
        itemId: domain.id,
      });
    }

    if (isPublicDomain(domain)) {
      if (!domain.label.trim()) {
        issues.push({
          level: "error",
          message: "Public domain is missing a label.",
          itemType: "domain",
          itemId: domain.id,
        });
      }

      if (!domain.description.trim()) {
        issues.push({
          level: "error",
          message: "Public domain is missing a description.",
          itemType: "domain",
          itemId: domain.id,
        });
      }

      if (!domain.href.trim()) {
        issues.push({
          level: "error",
          message: "Public domain is missing an href.",
          itemType: "domain",
          itemId: domain.id,
        });
      }
    }

    seenDomainIds.add(domain.id);
    seenDomainSlugs.add(domain.slug);
  }

  const domainIds = new Set(domains.map((domain) => domain.id));

  for (const project of projects) {
    if (seenProjectIds.has(project.id)) {
      issues.push({
        level: "error",
        message: `Duplicate project id "${project.id}".`,
        itemType: "project",
        itemId: project.id,
      });
    }

    if (seenProjectSlugs.has(project.slug)) {
      issues.push({
        level: "error",
        message: `Duplicate project slug "${project.slug}".`,
        itemType: "project",
        itemId: project.id,
      });
    }

    if (!URL_SAFE_SLUG_PATTERN.test(project.slug)) {
      issues.push({
        level: "error",
        message: `Project slug "${project.slug}" is not URL-safe.`,
        itemType: "project",
        itemId: project.id,
      });
    }

    if (project.enabled && project.visibility === "public") {
      if (!project.title.trim()) {
        issues.push({
          level: "error",
          message: "Public project is missing a title.",
          itemType: "project",
          itemId: project.id,
        });
      }

      if (!project.tagline.trim()) {
        issues.push({
          level: "error",
          message: "Public project is missing a tagline.",
          itemType: "project",
          itemId: project.id,
        });
      }

      if (!project.summary.trim()) {
        issues.push({
          level: "error",
          message: "Public project is missing a summary.",
          itemType: "project",
          itemId: project.id,
        });
      }

      if (
        !project.domains.some((placement) => publicDomainIds.has(placement.domainId))
      ) {
        issues.push({
          level: "error",
          message: "Public project does not have any placement in a public domain.",
          itemType: "project",
          itemId: project.id,
        });
      }
    }

    const seenPlacementDomainIds = new Set<string>();

    for (const placement of project.domains) {
      if (!domainIds.has(placement.domainId)) {
        issues.push({
          level: "error",
          message: `Project references unknown domain "${placement.domainId}".`,
          itemType: "project",
          itemId: project.id,
        });
      }

      if (
        typeof placement.order !== "number" ||
        Number.isNaN(placement.order) ||
        placement.order <= 0
      ) {
        issues.push({
          level: "error",
          message: `Project placement for "${placement.domainId}" must have a positive numeric order.`,
          itemType: "project",
          itemId: project.id,
        });
      }

      if (seenPlacementDomainIds.has(placement.domainId)) {
        issues.push({
          level: "error",
          message: `Project has duplicate placement for domain "${placement.domainId}".`,
          itemType: "project",
          itemId: project.id,
        });
      }

      seenPlacementDomainIds.add(placement.domainId);
    }

    seenProjectIds.add(project.id);
    seenProjectSlugs.add(project.slug);
  }

  return {
    valid: !issues.some((issue) => issue.level === "error"),
    issues,
  };
}
