import "server-only";

import type { Domain } from "@prisma/client";
import { getDbOrThrow } from "@/src/lib/db";
import { normalizeDomain } from "@/src/lib/portfolio/normalize";
import type { DomainId, PortfolioDomain } from "@/src/lib/portfolio/schema";

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
