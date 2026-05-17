import "server-only";

import { Prisma } from "@prisma/client";
import { getDbOrThrow } from "@/src/lib/db";
import { normalizeProject } from "@/src/lib/portfolio/normalize";
import type {
  ContentVisibility,
  PortfolioProject,
  ProjectPlacementVisual,
  ProjectStatus,
} from "@/src/lib/portfolio/schema";

type DbProjectRecord = Prisma.ProjectGetPayload<{
  include: {
    domains: {
      orderBy: { order: "asc" };
    };
  };
}>;

type CmsDbProjectLinks = NonNullable<PortfolioProject["links"]>;
type CmsDbProjectContent = NonNullable<PortfolioProject["content"]>;
type CmsDbProjectVisual = NonNullable<PortfolioProject["visual"]>;
type ProjectDbClient = Prisma.TransactionClient | ReturnType<typeof getDbOrThrow>;

export type CmsDbProjectInput = {
  id?: string;
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  enabled: boolean;
  visibility: ContentVisibility;
  techStack: string[];
  highlights: string[];
  links?: CmsDbProjectLinks;
  content?: CmsDbProjectContent;
  visual?: CmsDbProjectVisual;
  domains: Array<{
    domainId: string;
    order: number;
    featured?: boolean;
    labelOverride?: string;
    orbitRadius?: number;
    orbitDuration?: number;
    moonSize?: number;
    initialAngle?: number;
    color?: string;
  }>;
  createdBy?: string;
  updatedBy?: string;
};

function toCmsMetadata(record: {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  archivedAt: Date | null;
  createdBy: string | null;
  updatedBy: string | null;
}) {
  return {
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    publishedAt: record.publishedAt?.toISOString(),
    archivedAt: record.archivedAt?.toISOString(),
    createdBy: record.createdBy ?? undefined,
    updatedBy: record.updatedBy ?? undefined,
  };
}

function toStringArray(value: Prisma.JsonValue | null | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function toObjectRecord(
  value: Prisma.JsonValue | null | undefined
): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function toOptionalString(record: Record<string, unknown> | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toOptionalStringArray(
  record: Record<string, unknown> | null,
  key: string
) {
  const value = record?.[key];

  if (!Array.isArray(value)) {
    return undefined;
  }

  const list = value.filter((item): item is string => typeof item === "string");
  return list.length > 0 ? list : undefined;
}

function buildProjectVisual(record: DbProjectRecord) {
  const baseVisual = toObjectRecord(record.visual);
  const placementVisuals = record.domains.reduce<
    Record<string, ProjectPlacementVisual>
  >((accumulator, placement) => {
    if (
      placement.orbitRadius === null ||
      placement.moonSize === null ||
      placement.initialAngle === null
    ) {
      return accumulator;
    }

    accumulator[placement.domainId] = {
      orbitRadius: placement.orbitRadius,
      orbitDuration: placement.orbitDuration ?? undefined,
      moonSize: placement.moonSize,
      initialAngle: placement.initialAngle,
      color: placement.color ?? undefined,
    };

    return accumulator;
  }, {});

  const visual = {
    moonColor: toOptionalString(baseVisual, "moonColor"),
    image: toOptionalString(baseVisual, "image"),
    icon: toOptionalString(baseVisual, "icon"),
    placements:
      Object.keys(placementVisuals).length > 0 ? placementVisuals : undefined,
  };

  return Object.values(visual).some((value) => value !== undefined)
    ? visual
    : undefined;
}

function mapProjectRecord(record: DbProjectRecord): PortfolioProject {
  const links = toObjectRecord(record.links);
  const content = toObjectRecord(record.content);

  return normalizeProject({
    id: record.id,
    slug: record.slug,
    title: record.title,
    shortTitle: record.shortTitle ?? undefined,
    tagline: record.tagline,
    summary: record.summary,
    status: record.status as ProjectStatus,
    enabled: record.enabled,
    visibility: record.visibility as ContentVisibility,
    domains: record.domains.map((placement) => ({
      domainId: placement.domainId,
      order: placement.order,
      featured: placement.featured,
      labelOverride: placement.labelOverride ?? undefined,
    })),
    techStack: toStringArray(record.techStack),
    highlights: toStringArray(record.highlights),
    links: links
      ? {
          live: toOptionalString(links, "live"),
          github: toOptionalString(links, "github"),
          demo: toOptionalString(links, "demo"),
          caseStudy: toOptionalString(links, "caseStudy"),
        }
      : undefined,
    visual: buildProjectVisual(record),
    content: content
      ? {
          overview: toOptionalString(content, "overview"),
          problem: toOptionalString(content, "problem"),
          solution: toOptionalString(content, "solution"),
          features: toOptionalStringArray(content, "features"),
          technicalDetails: toOptionalStringArray(content, "technicalDetails"),
          challenges: toOptionalStringArray(content, "challenges"),
          lessons: toOptionalStringArray(content, "lessons"),
          futurePlans: toOptionalStringArray(content, "futurePlans"),
        }
      : undefined,
    cms: toCmsMetadata(record),
  });
}

function toProjectVisualJson(visual?: CmsDbProjectVisual) {
  if (!visual) {
    return Prisma.JsonNull;
  }

  const json = {
    moonColor: visual.moonColor,
    image: visual.image,
    icon: visual.icon,
  };

  return Object.values(json).some((value) => typeof value === "string" && value)
    ? json
    : Prisma.JsonNull;
}

function toLinksJson(links?: CmsDbProjectLinks) {
  if (!links) {
    return Prisma.JsonNull;
  }

  const json = Object.fromEntries(
    Object.entries(links).filter((entry): entry is [string, string] => {
      const value = entry[1];
      return typeof value === "string" && value.trim().length > 0;
    })
  );

  return Object.keys(json).length > 0 ? json : Prisma.JsonNull;
}

function toContentJson(content?: CmsDbProjectContent) {
  if (!content) {
    return Prisma.JsonNull;
  }

  const json = Object.fromEntries(
    Object.entries(content).filter(([, value]) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return false;
    })
  );

  return Object.keys(json).length > 0 ? json : Prisma.JsonNull;
}

function toExistingJsonInput(value: Prisma.JsonValue | null) {
  return value === null ? Prisma.JsonNull : (value as Prisma.InputJsonValue);
}

async function writeProjectRelations(
  db: ProjectDbClient,
  projectId: string,
  input: CmsDbProjectInput,
  existing?: DbProjectRecord
) {
  const selectedDomainIds = new Set(input.domains.map((placement) => placement.domainId));

  await db.projectDomainPlacement.deleteMany({
    where: {
      projectId,
      domainId: {
        notIn: [...selectedDomainIds],
      },
    },
  });

  for (const placement of input.domains) {
    const previousPlacement = existing?.domains.find(
      (entry) => entry.domainId === placement.domainId
    );

    await db.projectDomainPlacement.upsert({
      where: {
        projectId_domainId: {
          projectId,
          domainId: placement.domainId,
        },
      },
      update: {
        order: placement.order,
        featured: placement.featured ?? false,
        labelOverride: placement.labelOverride ?? null,
        orbitRadius: placement.orbitRadius ?? previousPlacement?.orbitRadius ?? null,
        orbitDuration:
          placement.orbitDuration ?? previousPlacement?.orbitDuration ?? null,
        moonSize: placement.moonSize ?? previousPlacement?.moonSize ?? null,
        initialAngle: placement.initialAngle ?? previousPlacement?.initialAngle ?? null,
        color: placement.color ?? previousPlacement?.color ?? null,
      },
      create: {
        projectId,
        domainId: placement.domainId,
        order: placement.order,
        featured: placement.featured ?? false,
        labelOverride: placement.labelOverride ?? null,
        orbitRadius: placement.orbitRadius ?? null,
        orbitDuration: placement.orbitDuration ?? null,
        moonSize: placement.moonSize ?? null,
        initialAngle: placement.initialAngle ?? null,
        color: placement.color ?? null,
      },
    });
  }
}

export async function getCmsDbProjects(): Promise<PortfolioProject[]> {
  const db = getDbOrThrow();
  const projects = await db.project.findMany({
    include: {
      domains: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: [{ title: "asc" }, { slug: "asc" }],
  });

  return projects.map(mapProjectRecord);
}

export async function getCmsDbProjectById(
  id: string
): Promise<PortfolioProject | null> {
  const db = getDbOrThrow();
  const project = await db.project.findUnique({
    where: { id },
    include: {
      domains: {
        orderBy: { order: "asc" },
      },
    },
  });

  return project ? mapProjectRecord(project) : null;
}

export async function getCmsDbProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  const db = getDbOrThrow();
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      domains: {
        orderBy: { order: "asc" },
      },
    },
  });

  return project ? mapProjectRecord(project) : null;
}

export async function createCmsDbProject(
  input: CmsDbProjectInput
): Promise<PortfolioProject> {
  const db = getDbOrThrow();
  const projectId = input.id ?? input.slug;

  return db.$transaction(async (transaction) => {
    await transaction.project.create({
      data: {
        id: projectId,
        slug: input.slug,
        title: input.title,
        shortTitle: input.shortTitle ?? null,
        tagline: input.tagline,
        summary: input.summary,
        status: input.status,
        enabled: input.enabled,
        visibility: input.visibility,
        techStack: input.techStack,
        highlights: input.highlights,
        links: toLinksJson(input.links),
        visual: toProjectVisualJson(input.visual),
        content: toContentJson(input.content),
        createdBy: input.createdBy ?? null,
        updatedBy: input.updatedBy ?? null,
      },
    });

    await writeProjectRelations(transaction, projectId, input);

    const createdProject = await transaction.project.findUniqueOrThrow({
      where: { id: projectId },
      include: {
        domains: {
          orderBy: { order: "asc" },
        },
      },
    });

    return mapProjectRecord(createdProject);
  });
}

export async function updateCmsDbProject(
  id: string,
  input: CmsDbProjectInput
): Promise<PortfolioProject> {
  const db = getDbOrThrow();
  const existingProject = await db.project.findUnique({
    where: { id },
    include: {
      domains: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!existingProject) {
    throw new Error(`Project "${id}" was not found in the CMS database.`);
  }

  return db.$transaction(async (transaction) => {
    await transaction.project.update({
      where: { id },
      data: {
        slug: input.slug,
        title: input.title,
        shortTitle: input.shortTitle ?? null,
        tagline: input.tagline,
        summary: input.summary,
        status: input.status,
        enabled: input.enabled,
        visibility: input.visibility,
        techStack: input.techStack,
        highlights: input.highlights,
        links: toLinksJson(input.links),
        visual:
          input.visual === undefined
            ? toExistingJsonInput(existingProject.visual)
            : toProjectVisualJson(input.visual),
        content: toContentJson(input.content),
        updatedBy: input.updatedBy ?? existingProject.updatedBy,
      },
    });

    await writeProjectRelations(transaction, id, input, existingProject);

    const updatedProject = await transaction.project.findUniqueOrThrow({
      where: { id },
      include: {
        domains: {
          orderBy: { order: "asc" },
        },
      },
    });

    return mapProjectRecord(updatedProject);
  });
}
