import type {
  DomainId,
  PortfolioProject,
  ProjectPlacementVisual,
} from "@/src/data/portfolio";
import { getProjectDisplayTitle, getProjectPlacement } from "./normalize";

export type MoonLayoutInput = {
  project: PortfolioProject;
  domainId: DomainId | string;
  index: number;
  total: number;
};

export type MoonLayout = {
  orbitRadius: number;
  orbitDuration: number;
  moonSize: number;
  initialAngle: number;
  color?: string;
  displayLabel: string;
};

const FALLBACK_BASE_RADIUS = 148;
const FALLBACK_RADIUS_STEP = 16;
const FALLBACK_BASE_DURATION = 68;
const FALLBACK_DURATION_STEP = 8;
const FALLBACK_BASE_MOON_SIZE = 34;
const FALLBACK_MOON_SIZE_STEP = 2;
const FALLBACK_MIN_MOON_SIZE = 22;
const FALLBACK_START_ANGLE = -18;

function getFallbackInitialAngle(index: number, total: number) {
  const safeTotal = Math.max(total, 1);
  return FALLBACK_START_ANGLE + (360 / safeTotal) * index;
}

function getFallbackPlacementVisual(
  order: number,
  index: number,
  total: number,
  color?: string
): ProjectPlacementVisual {
  const normalizedOrder = Math.max(1, Math.floor(order));

  return {
    orbitRadius:
      FALLBACK_BASE_RADIUS + (normalizedOrder - 1) * FALLBACK_RADIUS_STEP,
    orbitDuration:
      FALLBACK_BASE_DURATION + (normalizedOrder - 1) * FALLBACK_DURATION_STEP,
    moonSize: Math.max(
      FALLBACK_MIN_MOON_SIZE,
      FALLBACK_BASE_MOON_SIZE - (normalizedOrder - 1) * FALLBACK_MOON_SIZE_STEP
    ),
    initialAngle: getFallbackInitialAngle(index, total),
    color,
  };
}

export function getMoonLayout({
  project,
  domainId,
  index,
  total,
}: MoonLayoutInput): MoonLayout {
  const placement = getProjectPlacement(project, domainId);
  const order = placement?.order ?? index + 1;
  const explicit = project.visual?.placements?.[domainId];
  const fallback = getFallbackPlacementVisual(
    order,
    index,
    total,
    project.visual?.moonColor
  );

  return {
    orbitRadius: explicit?.orbitRadius ?? fallback.orbitRadius ?? 148,
    orbitDuration: explicit?.orbitDuration ?? fallback.orbitDuration ?? 84,
    moonSize: explicit?.moonSize ?? fallback.moonSize ?? 24,
    initialAngle: explicit?.initialAngle ?? fallback.initialAngle ?? 0,
    color: explicit?.color ?? fallback.color,
    displayLabel: getProjectDisplayTitle(project, domainId),
  };
}
