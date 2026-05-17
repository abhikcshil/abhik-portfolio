import type { DomainId, PortfolioDomain } from "./schema";
import { getCmsDomainById, getCmsDomainBySlug, getCmsDomains } from "./cms";
import { isPublicDomain } from "./normalize";

export function getAllDomains(): PortfolioDomain[] {
  return getCmsDomains();
}

export function getEnabledDomains(): PortfolioDomain[] {
  return getAllDomains().filter((domain) => domain.enabled);
}

export function getOrderedDomains(): PortfolioDomain[] {
  return getAllDomains().sort((left, right) => left.order - right.order);
}

export function getOrderedEnabledDomains(): PortfolioDomain[] {
  return getEnabledDomains().sort((left, right) => left.order - right.order);
}

export function getPublicDomains(): PortfolioDomain[] {
  return getAllDomains()
    .filter(isPublicDomain)
    .sort((left, right) => left.order - right.order);
}

export function getPublicDomainById(
  domainId: DomainId | string
): PortfolioDomain | null {
  return getPublicDomains().find((domain) => domain.id === domainId) ?? null;
}

export function getPublicDomainBySlug(slug: string): PortfolioDomain | null {
  return getPublicDomains().find((domain) => domain.slug === slug) ?? null;
}

export const getDomainById = getPublicDomainById;
export const getDomainBySlug = getPublicDomainBySlug;

export {
  getCmsDomainById,
  getCmsDomainBySlug,
  getCmsDomains,
};
