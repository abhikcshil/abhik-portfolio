import "server-only";

import { unstable_cache } from "next/cache";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { getCmsDbProjects } from "@/src/lib/cms/dbProjects";
import type {
  DomainId,
  PortfolioDomain,
  PortfolioProject,
} from "@/src/lib/portfolio/schema";
import {
  getProjectPlacement,
  isPublicDomain,
  isPublicProject,
} from "./normalize";
import { getPublicDomains as getStaticPublicDomains } from "./domains";
import {
  getPublicProjects as getStaticPublicProjects,
  getPublicProjectsForDomain as getStaticPublicProjectsForDomain,
} from "./projects";

const PUBLIC_PORTFOLIO_TAG = "portfolio-public";
const PUBLIC_PORTFOLIO_REVALIDATE_SECONDS = 60;

export type PublicPortfolioSceneData = {
  domains: PortfolioDomain[];
  projects: PortfolioProject[];
  projectsByDomain: Record<string, PortfolioProject[]>;
  source: "database" | "static";
};

function warnPublicFallback(label: string, error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unknown database error.";

  console.warn(
    `[portfolio-public] Falling back to static data for ${label}: ${message}`
  );
}

function sortProjectsForDomain(
  projects: PortfolioProject[],
  domainId: DomainId | string
) {
  return [...projects].sort((left, right) => {
    const leftOrder = getProjectPlacement(left, domainId)?.order ?? 0;
    const rightOrder = getProjectPlacement(right, domainId)?.order ?? 0;

    return leftOrder - rightOrder || left.title.localeCompare(right.title);
  });
}

function groupProjectsByDomain(
  domains: PortfolioDomain[],
  projects: PortfolioProject[]
) {
  return Object.fromEntries(
    domains.map((domain) => [
      domain.id,
      sortProjectsForDomain(
        projects.filter((project) =>
          project.domains.some((placement) => placement.domainId === domain.id)
        ),
        domain.id
      ),
    ])
  );
}

function buildPublicPortfolioSceneData(
  domains: PortfolioDomain[],
  projects: PortfolioProject[],
  source: PublicPortfolioSceneData["source"]
): PublicPortfolioSceneData {
  const publicDomains = [...domains]
    .filter(isPublicDomain)
    .sort((left, right) => left.order - right.order);
  const publicProjects = [...projects].filter((project) =>
    isPublicProject(project, publicDomains)
  );

  return {
    domains: publicDomains,
    projects: publicProjects,
    projectsByDomain: groupProjectsByDomain(publicDomains, publicProjects),
    source,
  };
}

function getStaticPublicPortfolioSceneData(): PublicPortfolioSceneData {
  const domains = getStaticPublicDomains();
  const projects = getStaticPublicProjects();

  return {
    domains,
    projects,
    projectsByDomain: Object.fromEntries(
      domains.map((domain) => [
        domain.id,
        getStaticPublicProjectsForDomain(domain.id),
      ])
    ),
    source: "static",
  };
}

async function withStaticFallback<T>(
  dbRead: () => Promise<T>,
  fallback: () => T,
  label: string
): Promise<T> {
  try {
    return await dbRead();
  } catch (error) {
    warnPublicFallback(label, error);
    return fallback();
  }
}

const loadPublicPortfolioSceneDataCached = unstable_cache(
  async (): Promise<PublicPortfolioSceneData> =>
    withStaticFallback(
      async () => {
        const [domains, projects] = await Promise.all([
          getCmsDbDomains(),
          getCmsDbProjects(),
        ]);

        if (domains.length === 0) {
          throw new Error("Database returned zero domain records.");
        }

        return buildPublicPortfolioSceneData(domains, projects, "database");
      },
      getStaticPublicPortfolioSceneData,
      "public portfolio scene"
    ),
  ["portfolio-public-scene-data"],
  {
    revalidate: PUBLIC_PORTFOLIO_REVALIDATE_SECONDS,
    tags: [PUBLIC_PORTFOLIO_TAG],
  }
);

export function getPublicPortfolioCacheTag() {
  return PUBLIC_PORTFOLIO_TAG;
}

export function getPublicPortfolioRevalidateSeconds() {
  return PUBLIC_PORTFOLIO_REVALIDATE_SECONDS;
}

export async function getPublicPortfolioSceneDataCached() {
  return loadPublicPortfolioSceneDataCached();
}

export async function getPublicDomainsCached() {
  const data = await loadPublicPortfolioSceneDataCached();
  return data.domains;
}

export async function getPublicDomainBySlugCached(slug: string) {
  const domains = await getPublicDomainsCached();
  return domains.find((domain) => domain.slug === slug) ?? null;
}

export async function getPublicProjectsCached() {
  const data = await loadPublicPortfolioSceneDataCached();
  return data.projects;
}

export async function getPublicProjectBySlugCached(slug: string) {
  const projects = await getPublicProjectsCached();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getPublicProjectsForDomainCached(
  domainId: DomainId | string
) {
  const data = await loadPublicPortfolioSceneDataCached();

  return data.projectsByDomain[String(domainId)] ?? [];
}
