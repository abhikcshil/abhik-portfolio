export type {
  CmsMetadata,
  ContentVisibility,
  DomainId,
  PortfolioDomain,
  PortfolioDomainVisual,
  PortfolioProject,
  ProjectDomainPlacement,
  ProjectPlacementVisual,
  ProjectStatus,
} from "@/src/data/portfolio";

// Future DB mapping:
// PortfolioDomain -> Domain table
// PortfolioProject -> Project table
// ProjectDomainPlacement -> ProjectDomainPlacement join table
// Project links/content/media can later split into ProjectLink, ProjectContentSection, and ProjectMedia tables.
export const portfolioSchemaTables = {
  domain: "Domain",
  project: "Project",
  projectDomainPlacement: "ProjectDomainPlacement",
  projectLink: "ProjectLink",
  projectContentSection: "ProjectContentSection",
  projectMedia: "ProjectMedia",
} as const;
