import type { CmsMetadata, PortfolioProject } from "./types";

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

// Projects are the moons.
// A project's domains decide where it appears, and order controls future moon distance from center.
// This is CMS-ready static data for now, while preserving the current handcrafted motion layout.
const basePortfolioProjects: Array<
  Omit<PortfolioProject, "visibility" | "cms">
> = [
  {
    id: "antix",
    slug: "antix",
    title: "AnTix",
    tagline: "Ticketing and event operations tooling.",
    summary: "Ticketing and event operations tooling.",
    status: "live",
    enabled: true,
    domains: [{ domainId: "software", order: 1, featured: true }],
    techStack: ["Next.js", "TypeScript", "Product Design"],
    highlights: [
      "Event operations workflow design",
      "Ticketing-focused user flows",
      "Internal tooling concepts",
    ],
    visual: {
      moonColor: "rgba(56, 189, 248, 0.84)",
      placements: {
        software: {
          orbitRadius: 148,
          orbitDuration: 68,
          moonSize: 34,
          initialAngle: -18,
          color: "rgba(56, 189, 248, 0.84)",
        },
      },
    },
    content: {
      overview: "Stage 1 placeholder content for a future detailed project page.",
    },
  },
  {
    id: "tranquility",
    slug: "tranquility",
    title: "Tranquility",
    tagline: "Calm-focused product design and build work.",
    summary: "Calm-focused product design and build work.",
    status: "building",
    enabled: true,
    domains: [{ domainId: "software", order: 3 }],
    techStack: ["TypeScript", "UX", "Frontend Systems"],
    highlights: [
      "Intentional interface design",
      "Workflow-oriented thinking",
      "Iterative product development",
    ],
    visual: {
      moonColor: "rgba(125, 211, 252, 0.86)",
      placements: {
        software: {
          orbitRadius: 184,
          orbitDuration: 82,
          moonSize: 30,
          initialAngle: 62,
          color: "rgba(125, 211, 252, 0.86)",
        },
      },
    },
  },
  {
    id: "spotisync-app",
    slug: "spotisync-app",
    title: "SpotiSync",
    tagline: "Playlist and sync workflow software.",
    summary: "Playlist and sync workflow software.",
    status: "concept",
    enabled: true,
    domains: [
      { domainId: "software", order: 5 },
      {
        domainId: "music",
        order: 2,
        labelOverride: "SpotiSync Workflow",
      },
    ],
    techStack: ["Spotify API", "Automation", "Workflow Design"],
    highlights: [
      "Playlist organization ideas",
      "Cross-library sync concepts",
      "Tooling across software and music workflows",
    ],
    visual: {
      moonColor: "rgba(34, 197, 94, 0.82)",
      placements: {
        software: {
          orbitRadius: 210,
          orbitDuration: 96,
          moonSize: 28,
          initialAngle: 156,
          color: "rgba(34, 197, 94, 0.82)",
        },
        music: {
          orbitRadius: 200,
          orbitDuration: 92,
          moonSize: 24,
          initialAngle: 22,
          color: "rgba(52, 211, 153, 0.84)",
        },
      },
    },
  },
  {
    id: "flexpos",
    slug: "flexpos",
    title: "FlexPOS",
    tagline: "Point-of-sale system experiments.",
    summary: "Point-of-sale system experiments.",
    status: "coursework",
    enabled: true,
    domains: [{ domainId: "software", order: 2 }],
    techStack: ["Point of Sale", "Systems Thinking", "UI Prototyping"],
    highlights: [
      "Transaction flow modeling",
      "Retail interaction design",
      "Course-driven prototyping work",
    ],
    visual: {
      moonColor: "rgba(96, 165, 250, 0.8)",
      placements: {
        software: {
          orbitRadius: 166,
          orbitDuration: 74,
          moonSize: 26,
          initialAngle: 232,
          color: "rgba(96, 165, 250, 0.8)",
        },
      },
    },
  },
  {
    id: "studyduel",
    slug: "studyduel",
    title: "StudyDuel",
    tagline: "Competitive study and quiz tooling.",
    summary: "Competitive study and quiz tooling.",
    status: "concept",
    enabled: true,
    domains: [{ domainId: "software", order: 7 }],
    techStack: ["Gamification", "Learning Tools", "Frontend Prototyping"],
    highlights: [
      "Game-like study loops",
      "Peer competition mechanics",
      "Learning motivation concepts",
    ],
    visual: {
      moonColor: "rgba(14, 165, 233, 0.76)",
      placements: {
        software: {
          orbitRadius: 230,
          orbitDuration: 112,
          moonSize: 24,
          initialAngle: 308,
          color: "rgba(14, 165, 233, 0.76)",
        },
      },
    },
  },
  {
    id: "soulframe",
    slug: "soulframe",
    title: "SoulFrame",
    tagline: "Embedded frame and interactive hardware system.",
    summary: "Embedded frame and interactive hardware system.",
    status: "live",
    enabled: true,
    domains: [
      { domainId: "hardware", order: 1, featured: true },
      { domainId: "software", order: 4, featured: true },
    ],
    techStack: ["Embedded Systems", "Full-Stack Concepts", "Interactive Media"],
    highlights: [
      "Hardware-software integration",
      "Interactive system design",
      "Cross-domain product thinking",
    ],
    visual: {
      moonColor: "rgba(251, 191, 36, 0.84)",
      placements: {
        hardware: {
          orbitRadius: 144,
          orbitDuration: 66,
          moonSize: 34,
          initialAngle: 16,
          color: "rgba(251, 191, 36, 0.84)",
        },
        software: {
          orbitRadius: 196,
          orbitDuration: 88,
          moonSize: 28,
          initialAngle: 110,
          color: "rgba(250, 204, 21, 0.82)",
        },
      },
    },
  },
  {
    id: "tshcloud",
    slug: "tshcloud",
    title: "TSHCloud",
    tagline: "Hardware telemetry and control ideas.",
    summary: "Hardware telemetry and control ideas.",
    status: "building",
    enabled: true,
    domains: [{ domainId: "hardware", order: 3 }],
    techStack: ["Telemetry", "Cloud Concepts", "Device Monitoring"],
    highlights: [
      "Remote hardware monitoring concepts",
      "Device data pipelines",
      "Operational visibility ideas",
    ],
    visual: {
      moonColor: "rgba(250, 204, 21, 0.82)",
      placements: {
        hardware: {
          orbitRadius: 184,
          orbitDuration: 84,
          moonSize: 28,
          initialAngle: 86,
          color: "rgba(250, 204, 21, 0.82)",
        },
      },
    },
  },
  {
    id: "pitch-trainer",
    slug: "pitch-trainer",
    title: "Arduino Pitch Trainer",
    shortTitle: "Pitch Trainer",
    tagline: "Arduino audio-feedback training device.",
    summary: "Arduino audio-feedback training device.",
    status: "coursework",
    enabled: true,
    domains: [{ domainId: "hardware", order: 5 }],
    techStack: ["Arduino", "Audio Feedback", "Prototyping"],
    highlights: [
      "Embedded audio interaction",
      "Rapid hardware iteration",
      "Learning-focused build work",
    ],
    visual: {
      moonColor: "rgba(245, 158, 11, 0.84)",
      placements: {
        hardware: {
          orbitRadius: 217,
          orbitDuration: 98,
          moonSize: 24,
          initialAngle: 170,
          color: "rgba(245, 158, 11, 0.84)",
        },
      },
    },
  },
  {
    id: "qr-scanner",
    slug: "qr-scanner",
    title: "QR Check-In Scanner",
    shortTitle: "QR Scanner",
    tagline: "Attendance and check-in scanner hardware.",
    summary: "Attendance and check-in scanner hardware.",
    status: "building",
    enabled: true,
    domains: [{ domainId: "hardware", order: 2 }],
    techStack: ["Scanning", "Attendance Systems", "Hardware UX"],
    highlights: [
      "Check-in workflow design",
      "Physical interaction planning",
      "Operations-focused tooling",
    ],
    visual: {
      moonColor: "rgba(252, 211, 77, 0.8)",
      placements: {
        hardware: {
          orbitRadius: 166,
          orbitDuration: 76,
          moonSize: 26,
          initialAngle: 242,
          color: "rgba(252, 211, 77, 0.8)",
        },
      },
    },
  },
  {
    id: "camera-monitor-rig",
    slug: "camera-monitor-rig",
    title: "Camera Monitor Rig",
    shortTitle: "Monitor Rig",
    tagline: "Portable camera and monitor support rig.",
    summary: "Portable camera and monitor support rig.",
    status: "concept",
    enabled: true,
    domains: [{ domainId: "hardware", order: 7 }],
    techStack: ["Capture Gear", "Rigging", "Field Workflow"],
    highlights: [
      "Portable camera support ideas",
      "On-set monitoring workflow",
      "Physical gear layout planning",
    ],
    visual: {
      moonColor: "rgba(253, 224, 71, 0.76)",
      placements: {
        hardware: {
          orbitRadius: 238,
          orbitDuration: 116,
          moonSize: 22,
          initialAngle: 312,
          color: "rgba(253, 224, 71, 0.76)",
        },
      },
    },
  },
  {
    id: "dj-events",
    slug: "dj-events",
    title: "DJ Events",
    tagline: "Live event sets and performance systems.",
    summary: "Live event sets and performance systems.",
    status: "live",
    enabled: true,
    domains: [{ domainId: "music", order: 1, featured: true }],
    techStack: ["Performance", "DJ Systems", "Live Events"],
    highlights: [
      "Set planning and performance flow",
      "Crowd-aware transitions",
      "Real-world event execution",
    ],
    visual: {
      moonColor: "rgba(244, 114, 182, 0.84)",
      placements: {
        music: {
          orbitRadius: 148,
          orbitDuration: 70,
          moonSize: 34,
          initialAngle: -10,
          color: "rgba(244, 114, 182, 0.84)",
        },
      },
    },
  },
  {
    id: "library-workflow",
    slug: "library-workflow",
    title: "SpotiSync Library Workflow",
    shortTitle: "Library Flow",
    tagline: "Collection prep and playlist organization.",
    summary: "Collection prep and playlist organization.",
    status: "building",
    enabled: true,
    domains: [{ domainId: "music", order: 3 }],
    techStack: ["Music Library", "Metadata", "Playlist Ops"],
    highlights: [
      "Collection cleanup patterns",
      "Playlist prep workflow",
      "Music system organization",
    ],
    visual: {
      moonColor: "rgba(236, 72, 153, 0.82)",
      placements: {
        music: {
          orbitRadius: 182,
          orbitDuration: 86,
          moonSize: 28,
          initialAngle: 64,
          color: "rgba(236, 72, 153, 0.82)",
        },
      },
    },
  },
  {
    id: "event-audio",
    slug: "event-audio",
    title: "Event Audio Setup",
    shortTitle: "Audio Setup",
    tagline: "Signal flow and speaker deployment planning.",
    summary: "Signal flow and speaker deployment planning.",
    status: "live",
    enabled: true,
    domains: [{ domainId: "music", order: 5 }],
    techStack: ["Audio", "Signal Flow", "Live Sound"],
    highlights: [
      "Speaker and mixer planning",
      "Signal chain preparation",
      "Event deployment workflow",
    ],
    visual: {
      moonColor: "rgba(217, 70, 239, 0.8)",
      placements: {
        music: {
          orbitRadius: 215,
          orbitDuration: 102,
          moonSize: 24,
          initialAngle: 146,
          color: "rgba(217, 70, 239, 0.8)",
        },
      },
    },
  },
  {
    id: "lighting-fog",
    slug: "lighting-fog",
    title: "Lighting/Fog Setup",
    shortTitle: "Lighting/Fog",
    tagline: "Atmosphere and lighting cue work.",
    summary: "Atmosphere and lighting cue work.",
    status: "concept",
    enabled: true,
    domains: [{ domainId: "music", order: 4 }],
    techStack: ["Lighting", "Atmosphere", "Show Design"],
    highlights: [
      "Ambience planning",
      "Cue-based visual timing",
      "Show energy shaping",
    ],
    visual: {
      moonColor: "rgba(192, 132, 252, 0.8)",
      placements: {
        music: {
          orbitRadius: 166,
          orbitDuration: 78,
          moonSize: 26,
          initialAngle: 228,
          color: "rgba(192, 132, 252, 0.8)",
        },
      },
    },
  },
  {
    id: "music-library",
    slug: "music-library",
    title: "Clean Music Library",
    shortTitle: "Clean Library",
    tagline: "Metadata and crate-cleaning workflow.",
    summary: "Metadata and crate-cleaning workflow.",
    status: "building",
    enabled: true,
    domains: [{ domainId: "music", order: 7 }],
    techStack: ["Metadata", "Crate Management", "Workflow Cleanup"],
    highlights: [
      "Library hygiene systems",
      "Repeatable tagging workflow",
      "Searchable collection structure",
    ],
    visual: {
      moonColor: "rgba(249, 168, 212, 0.76)",
      placements: {
        music: {
          orbitRadius: 238,
          orbitDuration: 118,
          moonSize: 22,
          initialAngle: 302,
          color: "rgba(249, 168, 212, 0.76)",
        },
      },
    },
  },
  {
    id: "photography",
    slug: "photography",
    title: "Photography",
    tagline: "Portrait and event photography work.",
    summary: "Portrait and event photography work.",
    status: "live",
    enabled: true,
    domains: [{ domainId: "visuals", order: 1, featured: true }],
    techStack: ["Photography", "Portraits", "Events"],
    highlights: [
      "Portrait and event capture",
      "Shot selection workflow",
      "Visual storytelling practice",
    ],
    visual: {
      moonColor: "rgba(147, 197, 253, 0.84)",
      placements: {
        visuals: {
          orbitRadius: 150,
          orbitDuration: 72,
          moonSize: 32,
          initialAngle: 8,
          color: "rgba(147, 197, 253, 0.84)",
        },
      },
    },
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Video Editing",
    tagline: "Narrative and event edit workflows.",
    summary: "Narrative and event edit workflows.",
    status: "live",
    enabled: true,
    domains: [{ domainId: "visuals", order: 3 }],
    techStack: ["Editing", "Story Pace", "Post-Production"],
    highlights: [
      "Narrative pacing",
      "Event recap workflows",
      "Post-production refinement",
    ],
    visual: {
      moonColor: "rgba(96, 165, 250, 0.84)",
      placements: {
        visuals: {
          orbitRadius: 186,
          orbitDuration: 88,
          moonSize: 28,
          initialAngle: 76,
          color: "rgba(96, 165, 250, 0.84)",
        },
      },
    },
  },
  {
    id: "motion-art",
    slug: "motion-art",
    title: "Motion Art",
    tagline: "Animated visual experiments and motion pieces.",
    summary: "Animated visual experiments and motion pieces.",
    status: "concept",
    enabled: true,
    domains: [{ domainId: "visuals", order: 5 }],
    techStack: ["Motion Design", "Animation", "Visual Experiments"],
    highlights: [
      "Animated composition studies",
      "Movement-driven storytelling",
      "Experimental motion workflows",
    ],
    visual: {
      moonColor: "rgba(129, 140, 248, 0.8)",
      placements: {
        visuals: {
          orbitRadius: 217,
          orbitDuration: 104,
          moonSize: 24,
          initialAngle: 162,
          color: "rgba(129, 140, 248, 0.8)",
        },
      },
    },
  },
  {
    id: "portfolio-site",
    slug: "portfolio-site",
    title: "Portfolio Site",
    tagline: "This interface and its surrounding design system.",
    summary: "This interface and its surrounding design system.",
    status: "building",
    enabled: true,
    domains: [
      { domainId: "visuals", order: 4 },
      { domainId: "software", order: 6 },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Portfolio experience design",
      "Custom animated system UI",
      "CMS-ready data modeling groundwork",
    ],
    visual: {
      moonColor: "rgba(191, 219, 254, 0.84)",
      placements: {
        visuals: {
          orbitRadius: 168,
          orbitDuration: 80,
          moonSize: 26,
          initialAngle: 236,
          color: "rgba(191, 219, 254, 0.84)",
        },
        software: {
          orbitRadius: 244,
          orbitDuration: 118,
          moonSize: 22,
          initialAngle: 24,
          color: "rgba(191, 219, 254, 0.82)",
        },
      },
    },
    content: {
      futurePlans: ["Private CMS and GitHub-authenticated admin workflow."],
    },
  },
  {
    id: "camera-rig",
    slug: "camera-rig",
    title: "Camera Rig",
    tagline: "Gear layout and capture support workflow.",
    summary: "Gear layout and capture support workflow.",
    status: "coursework",
    enabled: true,
    domains: [
      { domainId: "visuals", order: 7 },
      { domainId: "hardware", order: 6 },
    ],
    techStack: ["Capture Workflow", "Rigging", "Production Support"],
    highlights: [
      "Gear layout planning",
      "Production support setup",
      "Hardware and visual workflow crossover",
    ],
    visual: {
      moonColor: "rgba(165, 180, 252, 0.76)",
      placements: {
        visuals: {
          orbitRadius: 238,
          orbitDuration: 120,
          moonSize: 22,
          initialAngle: 312,
          color: "rgba(165, 180, 252, 0.76)",
        },
        hardware: {
          orbitRadius: 228,
          orbitDuration: 108,
          moonSize: 22,
          initialAngle: 40,
          color: "rgba(148, 163, 184, 0.82)",
        },
      },
    },
  },
] as Array<Omit<PortfolioProject, "visibility" | "cms">>;

export const portfolioProjects: PortfolioProject[] = basePortfolioProjects.map(
  (project) => ({
    ...project,
    visibility: "public",
    cms: createStaticCmsMetadata(),
  })
);
