import type {
  DomainId,
  PortfolioDomain,
  PortfolioProject,
  ProjectDomainPlacement,
} from "./schema";
import { getCmsProjectById, getCmsProjectBySlug, getCmsProjects } from "./cms";
import { getPublicDomains } from "./domains";
import {
  getProjectDisplayTitle,
  getProjectPlacement,
  isPublicProject,
} from "./normalize";

export function getAllProjects(): PortfolioProject[] {
  return getCmsProjects();
}

export function getEnabledProjects(): PortfolioProject[] {
  return getAllProjects().filter((project) => project.enabled);
}

export function getProjectById(projectId: string): PortfolioProject | null {
  return getPublicProjectById(projectId);
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return getPublicProjectBySlug(slug);
}

export function getPublicProjects(): PortfolioProject[] {
  const publicDomains = getPublicDomains();
  return getAllProjects().filter((project) => isPublicProject(project, publicDomains));
}

export function getPublicProjectById(projectId: string): PortfolioProject | null {
  return getPublicProjects().find((project) => project.id === projectId) ?? null;
}

export function getPublicProjectBySlug(slug: string): PortfolioProject | null {
  return getPublicProjects().find((project) => project.slug === slug) ?? null;
}

export function getProjectDomainPlacement(
  project: PortfolioProject,
  domainId: DomainId | string
): ProjectDomainPlacement | null {
  return getProjectPlacement(project, domainId);
}

function sortProjectsForDomain(
  projects: PortfolioProject[],
  domainId: DomainId | string
): PortfolioProject[] {
  return projects
    .sort((left, right) => {
      const leftOrder = getProjectDomainPlacement(left, domainId)?.order ?? 0;
      const rightOrder = getProjectDomainPlacement(right, domainId)?.order ?? 0;

      return leftOrder - rightOrder || left.title.localeCompare(right.title);
    });
}

function hasMatchingDomainPlacement(
  project: PortfolioProject,
  domainId: DomainId | string
): boolean {
  return project.domains.some((placement) => placement.domainId === domainId);
}

function isProjectPublicForDomains(
  project: PortfolioProject,
  publicDomains: PortfolioDomain[]
): boolean {
  return isPublicProject(project, publicDomains);
}

export function getPublicProjectsForDomain(
  domainId: DomainId | string
): PortfolioProject[] {
  const publicDomains = getPublicDomains();

  if (!publicDomains.some((domain) => domain.id === domainId)) {
    return [];
  }

  return sortProjectsForDomain(
    getPublicProjects().filter(
      (project) =>
        hasMatchingDomainPlacement(project, domainId) &&
        isProjectPublicForDomains(project, publicDomains)
    ),
    domainId
  );
}

export function getProjectsForDomain(
  domainId: DomainId | string
): PortfolioProject[] {
  return getPublicProjectsForDomain(domainId);
}

export { getProjectDisplayTitle, getProjectPlacement };
export {
  getCmsProjectById,
  getCmsProjectBySlug,
  getCmsProjects,
};
