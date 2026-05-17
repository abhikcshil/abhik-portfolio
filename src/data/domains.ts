import {
  getPublicDomains,
  type DomainId,
  type PortfolioDomain,
} from "@/src/lib/portfolio";

export type { DomainId };

export type Domain = {
  id: DomainId;
  label: string;
  href: string;
  orbitRadius: number;
  orbitDuration: number;
  initialAngle: number;
  orbitLineOpacity: number;
  planetSize: number;
  zIndexHint?: number;
  visual: {
    surface: string;
    detail: string;
    rim: string;
    glow: string;
    label: string;
  };
};

function toLegacyDomain(domain: PortfolioDomain): Domain {
  return {
    id: domain.id,
    label: domain.label,
    href: domain.href,
    orbitRadius: domain.visual.orbitRadius ?? 0,
    orbitDuration: domain.visual.orbitDuration ?? 0,
    initialAngle: domain.visual.initialAngle ?? 0,
    orbitLineOpacity: domain.visual.orbitLineOpacity ?? 0.4,
    planetSize: domain.visual.planetSize ?? 44,
    zIndexHint: domain.visual.zIndexHint,
    visual: {
      surface: domain.visual.surface,
      detail: domain.visual.detail,
      rim: domain.visual.rim,
      glow: domain.visual.glow,
      label: domain.visual.label,
    },
  };
}

export const domains = getPublicDomains().map(toLegacyDomain);
