export type Domain = {
  id: string;
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

export const domains: Domain[] = [
  {
    id: "software",
    label: "Software",
    href: "/software",
    orbitRadius: 18,
    orbitDuration: 54,
    initialAngle: -38,
    orbitLineOpacity: 0.42,
    planetSize: 60,
    zIndexHint: 34,
    visual: {
      surface:
        "radial-gradient(circle at 24% 20%, rgba(255,255,255,0.98) 0 7%, rgba(186,230,253,0.9) 13%, rgba(34,211,238,0.82) 29%, rgba(8,145,178,0.78) 49%, rgba(8,47,73,0.96) 73%, rgba(1,5,12,1) 100%)",
      detail:
        "linear-gradient(92deg, transparent 0 39%, rgba(236,254,255,0.24) 40% 42%, transparent 43% 100%), linear-gradient(8deg, transparent 0 50%, rgba(125,211,252,0.16) 51% 53%, transparent 54% 100%), radial-gradient(ellipse at 62% 32%, rgba(103,232,249,0.18) 0 16%, transparent 42%)",
      rim: "rgba(186, 230, 253, 0.72)",
      glow: "rgba(34, 211, 238, 0.38)",
      label: "rgba(103, 232, 249, 0.88)",
    },
  },
  {
    id: "hardware",
    label: "Hardware",
    href: "/hardware",
    orbitRadius: 27,
    orbitDuration: 70,
    initialAngle: 118,
    orbitLineOpacity: 0.46,
    planetSize: 56,
    zIndexHint: 28,
    visual: {
      surface:
        "radial-gradient(circle at 25% 21%, rgba(255,255,245,0.98) 0 7%, rgba(254,240,138,0.82) 15%, rgba(214,211,209,0.78) 31%, rgba(120,113,108,0.78) 55%, rgba(41,37,36,0.98) 76%, rgba(5,4,3,1) 100%)",
      detail:
        "linear-gradient(135deg, transparent 0 32%, rgba(251,191,36,0.24) 33% 37%, transparent 38% 100%), linear-gradient(22deg, transparent 0 60%, rgba(245,245,244,0.14) 61% 64%, transparent 65% 100%)",
      rim: "rgba(250, 250, 249, 0.62)",
      glow: "rgba(251, 191, 36, 0.3)",
      label: "rgba(253, 230, 138, 0.88)",
    },
  },
  {
    id: "music",
    label: "Music",
    href: "/music",
    orbitRadius: 36,
    orbitDuration: 86,
    initialAngle: 207,
    orbitLineOpacity: 0.5,
    planetSize: 50,
    zIndexHint: 22,
    visual: {
      surface:
        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.98) 0 7%, rgba(253,244,255,0.9) 12%, rgba(244,114,182,0.78) 27%, rgba(168,85,247,0.78) 52%, rgba(67,56,202,0.92) 73%, rgba(9,9,18,1) 100%)",
      detail:
        "radial-gradient(ellipse at 66% 36%, rgba(251,146,60,0.3) 0 16%, transparent 43%), conic-gradient(from 210deg, transparent 0 36%, rgba(251,207,232,0.16) 39% 44%, transparent 47% 100%)",
      rim: "rgba(233, 213, 255, 0.68)",
      glow: "rgba(217, 70, 239, 0.34)",
      label: "rgba(249, 168, 212, 0.9)",
    },
  },
  {
    id: "visuals",
    label: "Visuals",
    href: "/visuals",
    orbitRadius: 45,
    orbitDuration: 104,
    initialAngle: 316,
    orbitLineOpacity: 0.54,
    planetSize: 54,
    zIndexHint: 38,
    visual: {
      surface:
        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.98) 0 8%, rgba(224,242,254,0.9) 15%, rgba(147,197,253,0.78) 31%, rgba(99,102,241,0.68) 54%, rgba(49,46,129,0.94) 76%, rgba(2,6,23,1) 100%)",
      detail:
        "radial-gradient(ellipse at 56% 40%, rgba(255,255,255,0.26) 0 15%, transparent 44%), conic-gradient(from 140deg, transparent 0 38%, rgba(147,197,253,0.2) 41% 47%, transparent 50% 100%)",
      rim: "rgba(219, 234, 254, 0.7)",
      glow: "rgba(147, 197, 253, 0.34)",
      label: "rgba(191, 219, 254, 0.92)",
    },
  },
];
