import { Prisma, PrismaClient } from "@prisma/client";
import { portfolioDomains, portfolioProjects } from "../src/data/portfolio";

const prisma = new PrismaClient();

function toOptionalDate(value?: string) {
  return value ? new Date(value) : null;
}

function toDomainUpdateInput(
  domain: (typeof portfolioDomains)[number]
){
  return {
    slug: domain.slug,
    label: domain.label,
    shortLabel: domain.shortLabel ?? null,
    description: domain.description,
    enabled: domain.enabled,
    visibility: domain.visibility,
    order: domain.order,
    href: domain.href,
    color: domain.visual.color,
    glowColor: domain.visual.glowColor ?? null,
    gradient: domain.visual.gradient ?? null,
    orbitRadius: domain.visual.orbitRadius ?? null,
    orbitDuration: domain.visual.orbitDuration ?? null,
    planetSize: domain.visual.planetSize ?? null,
    initialAngle: domain.visual.initialAngle ?? null,
    orbitLineOpacity: domain.visual.orbitLineOpacity ?? null,
    zIndexHint: domain.visual.zIndexHint ?? null,
    surface: domain.visual.surface,
    detail: domain.visual.detail,
    rim: domain.visual.rim,
    glow: domain.visual.glow,
    labelColor: domain.visual.label,
    publishedAt: toOptionalDate(domain.cms.publishedAt),
    archivedAt: toOptionalDate(domain.cms.archivedAt),
    createdBy: domain.cms.createdBy ?? null,
    updatedBy: domain.cms.updatedBy ?? null,
  };
}

function toDomainCreateInput(
  domain: (typeof portfolioDomains)[number]
){
  return {
    id: domain.id,
    createdAt: new Date(domain.cms.createdAt),
    ...toDomainUpdateInput(domain),
  };
}

function toProjectVisualJson(project: (typeof portfolioProjects)[number]) {
  if (!project.visual) {
    return Prisma.JsonNull;
  }

  const visual = {
    moonColor: project.visual.moonColor,
    image: project.visual.image,
    icon: project.visual.icon,
  };

  return Object.values(visual).some((value) => typeof value === "string" && value)
    ? visual
    : Prisma.JsonNull;
}

function toProjectUpdateInput(
  project: (typeof portfolioProjects)[number]
){
  return {
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle ?? null,
    tagline: project.tagline,
    summary: project.summary,
    status: project.status,
    enabled: project.enabled,
    visibility: project.visibility,
    techStack: project.techStack,
    highlights: project.highlights,
    links: project.links ?? Prisma.JsonNull,
    visual: toProjectVisualJson(project),
    content: project.content ?? Prisma.JsonNull,
    publishedAt: toOptionalDate(project.cms.publishedAt),
    archivedAt: toOptionalDate(project.cms.archivedAt),
    createdBy: project.cms.createdBy ?? null,
    updatedBy: project.cms.updatedBy ?? null,
  };
}

function toProjectCreateInput(
  project: (typeof portfolioProjects)[number]
){
  return {
    id: project.id,
    createdAt: new Date(project.cms.createdAt),
    ...toProjectUpdateInput(project),
  };
}

async function seedDomains() {
  for (const domain of portfolioDomains) {
    await prisma.domain.upsert({
      where: { id: domain.id },
      update: toDomainUpdateInput(domain),
      create: toDomainCreateInput(domain),
    });
  }
}

async function seedProjects() {
  for (const project of portfolioProjects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: toProjectUpdateInput(project),
      create: toProjectCreateInput(project),
    });

    for (const placement of project.domains) {
      const placementVisual = project.visual?.placements?.[placement.domainId];

      await prisma.projectDomainPlacement.upsert({
        where: {
          projectId_domainId: {
            projectId: project.id,
            domainId: placement.domainId,
          },
        },
        update: {
          order: placement.order,
          featured: placement.featured ?? false,
          labelOverride: placement.labelOverride ?? null,
          orbitRadius: placementVisual?.orbitRadius ?? null,
          orbitDuration: placementVisual?.orbitDuration ?? null,
          moonSize: placementVisual?.moonSize ?? null,
          initialAngle: placementVisual?.initialAngle ?? null,
          color: placementVisual?.color ?? null,
        },
        create: {
          projectId: project.id,
          domainId: placement.domainId,
          order: placement.order,
          featured: placement.featured ?? false,
          labelOverride: placement.labelOverride ?? null,
          orbitRadius: placementVisual?.orbitRadius ?? null,
          orbitDuration: placementVisual?.orbitDuration ?? null,
          moonSize: placementVisual?.moonSize ?? null,
          initialAngle: placementVisual?.initialAngle ?? null,
          color: placementVisual?.color ?? null,
        },
      });
    }
  }
}

async function main() {
  await seedDomains();
  await seedProjects();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Prisma seed failed.", error);
    await prisma.$disconnect();
    process.exit(1);
  });
