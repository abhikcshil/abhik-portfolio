import { portfolioDomains, portfolioProjects } from "@/src/data/portfolio";
import type { DomainId, PortfolioDomain, PortfolioProject } from "./schema";
import { normalizeDomain, normalizeProject } from "./normalize";

export function getCmsDomains(): PortfolioDomain[] {
  return portfolioDomains.map(normalizeDomain).sort((left, right) => left.order - right.order);
}

export function getCmsProjects(): PortfolioProject[] {
  return portfolioProjects.map(normalizeProject);
}

export function getCmsDomainById(
  domainId: DomainId | string
): PortfolioDomain | null {
  return getCmsDomains().find((domain) => domain.id === domainId) ?? null;
}

export function getCmsDomainBySlug(slug: string): PortfolioDomain | null {
  return getCmsDomains().find((domain) => domain.slug === slug) ?? null;
}

export function getCmsProjectById(projectId: string): PortfolioProject | null {
  return getCmsProjects().find((project) => project.id === projectId) ?? null;
}

export function getCmsProjectBySlug(slug: string): PortfolioProject | null {
  return getCmsProjects().find((project) => project.slug === slug) ?? null;
}
