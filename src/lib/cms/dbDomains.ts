import "server-only";

import type { Domain } from "@prisma/client";
import { getDbOrThrow } from "@/src/lib/db";
import { getDomainVisualTokens } from "@/src/lib/portfolio/domainLayout";
import { normalizeDomain } from "@/src/lib/portfolio/normalize";
import type {
  ContentVisibility,
  DomainId,
  PortfolioDomain,
} from "@/src/lib/portfolio/schema";

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

export type CmsDbDomainInput = {
  id?: string;
  label: string;
  shortLabel?: string;
  slug: string;
  description: string;
  enabled: boolean;
  visibility: ContentVisibility;
  order: number;
  href?: string;
  color?: string;
  glowColor?: string;
  gradient?: string;
  orbitRadius?: number;
  orbitDuration?: number;
  planetSize?: number;
  initialAngle?: number;
  createdBy?: string;
  updatedBy?: string;
};

function mapDomainRecord(record: Domain): PortfolioDomain {
  return normalizeDomain({
    id: record.id,
    slug: record.slug,
    label: record.label,
    shortLabel: record.shortLabel ?? undefined,
    description: record.description,
    enabled: record.enabled,
    visibility: record.visibility as PortfolioDomain["visibility"],
    order: record.order,
    href: record.href,
    visual: {
      color: record.color,
      glowColor: record.glowColor ?? undefined,
      gradient: record.gradient ?? undefined,
      orbitRadius: record.orbitRadius ?? undefined,
      orbitDuration: record.orbitDuration ?? undefined,
      planetSize: record.planetSize ?? undefined,
      initialAngle: record.initialAngle ?? undefined,
      orbitLineOpacity: record.orbitLineOpacity ?? undefined,
      zIndexHint: record.zIndexHint ?? undefined,
      surface: record.surface,
      detail: record.detail,
      rim: record.rim,
      glow: record.glow,
      label: record.labelColor,
    },
    cms: toCmsMetadata(record),
  });
}

function buildDomainWriteData(input: CmsDbDomainInput, existing?: Domain) {
  const color = input.color?.trim() || existing?.color || "#22d3ee";
  const glowColor = input.glowColor?.trim() || undefined;
  const gradient = input.gradient?.trim() || undefined;
  const derivedVisuals = getDomainVisualTokens(color, glowColor, gradient);

  return {
    slug: input.slug,
    label: input.label,
    shortLabel: input.shortLabel ?? null,
    description: input.description,
    enabled: input.enabled,
    visibility: input.visibility,
    order: input.order,
    href: input.href?.trim() || `/${input.slug}`,
    color,
    glowColor: glowColor ?? null,
    gradient: gradient ?? null,
    orbitRadius: input.orbitRadius ?? null,
    orbitDuration: input.orbitDuration ?? null,
    planetSize: input.planetSize ?? null,
    initialAngle: input.initialAngle ?? null,
    orbitLineOpacity: existing?.orbitLineOpacity ?? null,
    zIndexHint: existing?.zIndexHint ?? null,
    surface: derivedVisuals.surface,
    detail: derivedVisuals.detail,
    rim: derivedVisuals.rim,
    glow: derivedVisuals.glow,
    labelColor: derivedVisuals.label,
    createdBy: input.createdBy ?? existing?.createdBy ?? null,
    updatedBy: input.updatedBy ?? existing?.updatedBy ?? null,
  };
}

export async function getCmsDbDomains(): Promise<PortfolioDomain[]> {
  const db = getDbOrThrow();
  const domains = await db.domain.findMany({
    orderBy: [{ order: "asc" }, { label: "asc" }],
  });

  return domains.map(mapDomainRecord);
}

export async function getCmsDbDomainById(
  id: DomainId | string
): Promise<PortfolioDomain | null> {
  const db = getDbOrThrow();
  const domain = await db.domain.findUnique({
    where: { id: String(id) },
  });

  return domain ? mapDomainRecord(domain) : null;
}

export async function getCmsDbDomainBySlug(
  slug: string
): Promise<PortfolioDomain | null> {
  const db = getDbOrThrow();
  const domain = await db.domain.findUnique({
    where: { slug },
  });

  return domain ? mapDomainRecord(domain) : null;
}

export async function createCmsDbDomain(
  input: CmsDbDomainInput
): Promise<PortfolioDomain> {
  const db = getDbOrThrow();
  const domainId = input.id ?? input.slug;

  const createdDomain = await db.domain.create({
    data: {
      id: domainId,
      ...buildDomainWriteData(input),
    },
  });

  return mapDomainRecord(createdDomain);
}

export async function updateCmsDbDomain(
  id: string,
  input: CmsDbDomainInput
): Promise<PortfolioDomain> {
  const db = getDbOrThrow();
  const existingDomain = await db.domain.findUnique({
    where: { id },
  });

  if (!existingDomain) {
    throw new Error(`Domain "${id}" was not found in the CMS database.`);
  }

  const updatedDomain = await db.domain.update({
    where: { id },
    data: buildDomainWriteData(input, existingDomain),
  });

  return mapDomainRecord(updatedDomain);
}
