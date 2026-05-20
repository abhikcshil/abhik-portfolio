import type { CmsMetadata, PortfolioDomain } from "./types";

const STATIC_CMS_TIMESTAMP = "2026-01-01T00:00:00.000Z";
const STATIC_CMS_USER = "abhik";

function createStaticCmsMetadata(): CmsMetadata {
  return {
    createdAt: STATIC_CMS_TIMESTAMP,
    updatedAt: STATIC_CMS_TIMESTAMP,
    publishedAt: STATIC_CMS_TIMESTAMP,
    createdBy: STATIC_CMS_USER,
    updatedBy: STATIC_CMS_USER,
  };
}

// Domains are the planets in the homepage system.
// This stays static for now, but the shape is ready for a future private CMS.
const basePortfolioDomains: Array<
  Omit<PortfolioDomain, "visibility" | "cms">
> = [
  {
    id: "software",
    slug: "software",
    label: "Software",
    shortLabel: "SW",
    description:
      "Applications, interfaces, systems design, and product engineering work.",
    enabled: true,
    order: 1,
    href: "/software",
    visual: {
      color: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.38)",
      gradient:
        "radial-gradient(circle at 24% 20%, rgba(255,255,255,0.98) 0 7%, rgba(224,242,254,0.92) 13%, rgba(56,189,248,0.82) 29%, rgba(14,165,233,0.78) 49%, rgba(8,47,73,0.96) 73%, rgba(1,5,12,1) 100%)",
      orbitRadius: 16.5,
      orbitDuration: 54,
      planetSize: 52,
      initialAngle: -38,
      orbitLineOpacity: 0.42,
      zIndexHint: 34,
      surface:
        "radial-gradient(circle at 24% 20%, rgba(255,255,255,0.98) 0 7%, rgba(224,242,254,0.92) 13%, rgba(56,189,248,0.82) 29%, rgba(14,165,233,0.78) 49%, rgba(8,47,73,0.96) 73%, rgba(1,5,12,1) 100%)",
      detail:
        "linear-gradient(92deg, transparent 0 39%, rgba(236,254,255,0.24) 40% 42%, transparent 43% 100%), linear-gradient(8deg, transparent 0 50%, rgba(125,211,252,0.18) 51% 53%, transparent 54% 100%), radial-gradient(ellipse at 62% 32%, rgba(125,211,252,0.2) 0 16%, transparent 42%)",
      rim: "rgba(186, 230, 253, 0.74)",
      glow: "rgba(56, 189, 248, 0.38)",
      label: "rgba(125, 211, 252, 0.92)",
    },
  },
  {
    id: "hardware",
    slug: "hardware",
    label: "Hardware",
    shortLabel: "HW",
    description:
      "Embedded systems, physical builds, instrumentation, and device workflows.",
    enabled: true,
    order: 2,
    href: "/hardware",
    visual: {
      color: "#14b8a6",
      glowColor: "rgba(20, 184, 166, 0.32)",
      gradient:
        "radial-gradient(circle at 25% 21%, rgba(244,255,252,0.98) 0 7%, rgba(204,251,241,0.84) 15%, rgba(45,212,191,0.74) 31%, rgba(15,118,110,0.76) 55%, rgba(17,24,39,0.98) 76%, rgba(3,7,18,1) 100%)",
      orbitRadius: 24.5,
      orbitDuration: 70,
      planetSize: 40,
      initialAngle: 118,
      orbitLineOpacity: 0.46,
      zIndexHint: 28,
      surface:
        "radial-gradient(circle at 25% 21%, rgba(244,255,252,0.98) 0 7%, rgba(204,251,241,0.84) 15%, rgba(45,212,191,0.74) 31%, rgba(15,118,110,0.76) 55%, rgba(17,24,39,0.98) 76%, rgba(3,7,18,1) 100%)",
      detail:
        "linear-gradient(135deg, transparent 0 32%, rgba(20,184,166,0.22) 33% 37%, transparent 38% 100%), linear-gradient(22deg, transparent 0 60%, rgba(240,253,250,0.14) 61% 64%, transparent 65% 100%)",
      rim: "rgba(153, 246, 228, 0.66)",
      glow: "rgba(20, 184, 166, 0.32)",
      label: "rgba(153, 246, 228, 0.92)",
    },
  },
  {
    id: "music",
    slug: "music",
    label: "Music",
    shortLabel: "MU",
    description:
      "Performance systems, library workflows, audio setup, and live event craft.",
    enabled: true,
    order: 3,
    href: "/music",
    visual: {
      color: "#f97316",
      glowColor: "rgba(249, 115, 22, 0.34)",
      gradient:
        "radial-gradient(circle at 25% 20%, rgba(255,250,245,0.98) 0 7%, rgba(255,237,213,0.9) 12%, rgba(251,146,60,0.82) 27%, rgba(249,115,22,0.78) 52%, rgba(220,38,38,0.84) 73%, rgba(20,6,4,1) 100%)",
      orbitRadius: 31,
      orbitDuration: 86,
      planetSize: 54,
      initialAngle: 207,
      orbitLineOpacity: 0.5,
      zIndexHint: 22,
      surface:
        "radial-gradient(circle at 25% 20%, rgba(255,250,245,0.98) 0 7%, rgba(255,237,213,0.9) 12%, rgba(251,146,60,0.82) 27%, rgba(249,115,22,0.78) 52%, rgba(220,38,38,0.84) 73%, rgba(20,6,4,1) 100%)",
      detail:
        "radial-gradient(ellipse at 66% 36%, rgba(251,146,60,0.34) 0 16%, transparent 43%), conic-gradient(from 210deg, transparent 0 36%, rgba(254,215,170,0.18) 39% 44%, transparent 47% 100%)",
      rim: "rgba(254, 215, 170, 0.72)",
      glow: "rgba(249, 115, 22, 0.34)",
      label: "rgba(253, 186, 116, 0.92)",
    },
  },
  {
    id: "visuals",
    slug: "visuals",
    label: "Visuals",
    shortLabel: "VX",
    description:
      "Photography, editing, motion work, and visual storytelling systems.",
    enabled: true,
    order: 4,
    href: "/visuals",
    visual: {
      color: "#8b5cf6",
      glowColor: "rgba(139, 92, 246, 0.34)",
      gradient:
        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.98) 0 8%, rgba(243,232,255,0.92) 15%, rgba(168,85,247,0.78) 31%, rgba(139,92,246,0.72) 54%, rgba(91,33,182,0.92) 76%, rgba(8,4,24,1) 100%)",
      orbitRadius: 37,
      orbitDuration: 104,
      planetSize: 49,
      initialAngle: 316,
      orbitLineOpacity: 0.54,
      zIndexHint: 38,
      surface:
        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.98) 0 8%, rgba(243,232,255,0.92) 15%, rgba(168,85,247,0.78) 31%, rgba(139,92,246,0.72) 54%, rgba(91,33,182,0.92) 76%, rgba(8,4,24,1) 100%)",
      detail:
        "radial-gradient(ellipse at 56% 40%, rgba(255,255,255,0.24) 0 15%, transparent 44%), conic-gradient(from 140deg, transparent 0 38%, rgba(196,181,253,0.2) 41% 47%, transparent 50% 100%)",
      rim: "rgba(221, 214, 254, 0.72)",
      glow: "rgba(139, 92, 246, 0.34)",
      label: "rgba(196, 181, 253, 0.94)",
    },
  },
] as Array<Omit<PortfolioDomain, "visibility" | "cms">>;

export const portfolioDomains: PortfolioDomain[] = basePortfolioDomains.map(
  (domain) => ({
    ...domain,
    visibility: "public",
    cms: createStaticCmsMetadata(),
  })
);
