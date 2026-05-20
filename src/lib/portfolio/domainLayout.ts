import type {
  PortfolioDomain,
  PortfolioDomainVisual,
} from "@/src/data/portfolio";

const DOMAIN_FALLBACK_COLORS = [
  "#38bdf8",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#34d399",
  "#fb7185",
];

const FALLBACK_BASE_ORBIT_RADIUS = 16.5;
const FALLBACK_ORBIT_RADIUS_STEP = 8;
const FALLBACK_BASE_ORBIT_DURATION = 54;
const FALLBACK_ORBIT_DURATION_STEP = 16;
const FALLBACK_BASE_PLANET_SIZE = 52;
const FALLBACK_PLANET_SIZE_STEP = 3;
const FALLBACK_MIN_PLANET_SIZE = 40;
const FALLBACK_START_ANGLE = -38;
const FALLBACK_ORBIT_LINE_OPACITY = 0.46;

function getNormalizedOrder(order: number, index: number) {
  if (!Number.isFinite(order) || order <= 0) {
    return index + 1;
  }

  return Math.max(1, Math.floor(order));
}

function getFallbackColor(order: number, index: number) {
  return DOMAIN_FALLBACK_COLORS[
    (getNormalizedOrder(order, index) - 1) % DOMAIN_FALLBACK_COLORS.length
  ];
}

function getFallbackInitialAngle(index: number, total: number) {
  const safeTotal = Math.max(total, 1);
  return FALLBACK_START_ANGLE + (360 / safeTotal) * index;
}

function buildDerivedVisualStyles(
  color: string,
  glowColor?: string,
  gradient?: string
) {
  const resolvedGlow =
    glowColor ?? `color-mix(in srgb, ${color}, transparent 62%)`;

  return {
    surface:
      gradient ??
      `radial-gradient(circle at 24% 20%, rgba(255,255,255,0.98) 0 8%, color-mix(in srgb, ${color}, white 36%) 20%, ${color} 50%, rgba(2,6,23,0.96) 100%)`,
    detail: `radial-gradient(ellipse at 64% 36%, color-mix(in srgb, ${color}, white 38%) 0 16%, transparent 42%), linear-gradient(125deg, transparent 0 34%, color-mix(in srgb, ${color}, white 14%) 35% 42%, transparent 43% 100%)`,
    rim: `color-mix(in srgb, ${color}, white 56%)`,
    glow: resolvedGlow,
    label: `color-mix(in srgb, ${color}, white 48%)`,
  };
}

export function getDomainVisualTokens(
  color: string,
  glowColor?: string,
  gradient?: string
) {
  return buildDerivedVisualStyles(color, glowColor, gradient);
}

export function getDomainVisualWithFallback(
  domain: PortfolioDomain,
  index: number,
  total: number
): PortfolioDomainVisual {
  const normalizedOrder = getNormalizedOrder(domain.order, index);
  const fallbackColor = getFallbackColor(domain.order, index);
  const resolvedColor = domain.visual.color?.trim() || fallbackColor;
  const resolvedGlowColor = domain.visual.glowColor?.trim() || undefined;
  const resolvedGradient = domain.visual.gradient?.trim() || undefined;
  const derivedVisuals = buildDerivedVisualStyles(
    resolvedColor,
    resolvedGlowColor,
    resolvedGradient
  );

  return {
    color: resolvedColor,
    glowColor: resolvedGlowColor ?? derivedVisuals.glow,
    gradient: resolvedGradient,
    orbitRadius:
      domain.visual.orbitRadius ??
      FALLBACK_BASE_ORBIT_RADIUS +
        (normalizedOrder - 1) * FALLBACK_ORBIT_RADIUS_STEP,
    orbitDuration:
      domain.visual.orbitDuration ??
      FALLBACK_BASE_ORBIT_DURATION +
        (normalizedOrder - 1) * FALLBACK_ORBIT_DURATION_STEP,
    planetSize:
      domain.visual.planetSize ??
      Math.max(
        FALLBACK_MIN_PLANET_SIZE,
        FALLBACK_BASE_PLANET_SIZE -
          (normalizedOrder - 1) * FALLBACK_PLANET_SIZE_STEP
      ),
    initialAngle:
      domain.visual.initialAngle ??
      getFallbackInitialAngle(index, total),
    orbitLineOpacity:
      domain.visual.orbitLineOpacity ?? FALLBACK_ORBIT_LINE_OPACITY,
    zIndexHint: domain.visual.zIndexHint,
    surface: domain.visual.surface?.trim() || derivedVisuals.surface,
    detail: domain.visual.detail?.trim() || derivedVisuals.detail,
    rim: domain.visual.rim?.trim() || derivedVisuals.rim,
    glow: domain.visual.glow?.trim() || derivedVisuals.glow,
    label: domain.visual.label?.trim() || derivedVisuals.label,
  };
}

export function withDomainLayoutFallbacks(domains: PortfolioDomain[]) {
  const sortedDomains = [...domains].sort((left, right) => left.order - right.order);
  const total = sortedDomains.length;

  return sortedDomains.map((domain, index) => ({
    ...domain,
    visual: getDomainVisualWithFallback(domain, index, total),
  }));
}
