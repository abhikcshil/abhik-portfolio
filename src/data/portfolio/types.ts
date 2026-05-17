export const KNOWN_DOMAIN_IDS = [
  "software",
  "hardware",
  "music",
  "visuals",
] as const;

export type KnownDomainId = (typeof KNOWN_DOMAIN_IDS)[number];

// Supports the known starter domains while still allowing future CMS-added ids.
export type DomainId = KnownDomainId | (string & {});

export type CmsMetadata = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  archivedAt?: string;
  createdBy?: string;
  updatedBy?: string;
};

export const CONTENT_VISIBILITIES = [
  "public",
  "private",
  "draft",
  "archived",
] as const;

export type ContentVisibility = (typeof CONTENT_VISIBILITIES)[number];

export type PortfolioDomainVisual = {
  color: string;
  glowColor?: string;
  gradient?: string;
  orbitRadius?: number;
  orbitDuration?: number;
  planetSize?: number;
  initialAngle?: number;
  orbitLineOpacity?: number;
  zIndexHint?: number;
  surface: string;
  detail: string;
  rim: string;
  glow: string;
  label: string;
};

// Future DB mapping:
// PortfolioDomain -> Domain table
// PortfolioProject -> Project table
// ProjectDomainPlacement -> ProjectDomainPlacement join table
// Project links/content/media can split into ProjectLink, ProjectContentSection, and ProjectMedia tables.
export type PortfolioDomain = {
  id: DomainId;
  slug: string;
  label: string;
  shortLabel?: string;
  description: string;
  enabled: boolean;
  visibility: ContentVisibility;
  order: number;
  href: string;
  visual: PortfolioDomainVisual;
  cms: CmsMetadata;
};

export const PROJECT_STATUSES = [
  "live",
  "building",
  "paused",
  "concept",
  "coursework",
  "archived",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectDomainPlacement = {
  domainId: DomainId;
  order: number;
  featured?: boolean;
  labelOverride?: string;
};

export type ProjectPlacementVisual = {
  orbitRadius: number;
  orbitDuration?: number;
  moonSize: number;
  initialAngle: number;
  color?: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  enabled: boolean;
  visibility: ContentVisibility;
  domains: ProjectDomainPlacement[];
  techStack: string[];
  highlights: string[];
  links?: {
    live?: string;
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
  visual?: {
    moonColor?: string;
    image?: string;
    icon?: string;
    // Placement visuals preserve the current handcrafted moon layout.
    placements?: Record<string, ProjectPlacementVisual>;
  };
  content?: {
    overview?: string;
    problem?: string;
    solution?: string;
    features?: string[];
    technicalDetails?: string[];
    challenges?: string[];
    lessons?: string[];
    futurePlans?: string[];
  };
  cms: CmsMetadata;
};
