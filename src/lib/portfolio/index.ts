export type {
  DomainId,
  CmsMetadata,
  ContentVisibility,
  PortfolioDomain,
  PortfolioProject,
  ProjectDomainPlacement,
  ProjectStatus,
  ProjectPlacementVisual,
} from "@/src/data/portfolio";

export * from "./schema";
export * from "./domains";
export * from "./projects";
export * from "./moonLayout";
export * from "./normalize";
export * from "./validation";
export * from "./cms";

import { validatePortfolioData } from "./validation";

const portfolioValidationResult = validatePortfolioData();

if (
  process.env.NODE_ENV !== "production" &&
  typeof window === "undefined" &&
  portfolioValidationResult.issues.length > 0
) {
  const issueSummary = portfolioValidationResult.issues
    .map((issue) => `${issue.level.toUpperCase()}: ${issue.message}`)
    .join("\n");

  console.warn(`Portfolio data validation issues:\n${issueSummary}`);
}

export { portfolioValidationResult };
