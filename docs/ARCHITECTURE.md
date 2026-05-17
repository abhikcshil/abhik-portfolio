# Portfolio Architecture

## Overview

Abhik C. Shil's Portfolio is a data-driven interactive website built with
Next.js, TypeScript, and Tailwind CSS.

The public site uses a space-inspired navigation model:

- Domains are planets.
- Projects are moons.
- Project pages are case studies or structured project routes.
- The homepage is a visual navigation environment.
- The helper layer keeps the UI insulated from future data-source changes.

## Public Routes

```text
/
  Solar-system homepage

/projects/[slug]
  Project detail route

/[domain]
  Domain fallback route
```

## Private Admin Routes

```text
/admin
  Protected admin dashboard

/admin/domains
  Read-only CMS domain preview

/admin/projects
  Read-only CMS project preview
```

## Core Public UI

The homepage currently includes:

- Starfield background
- Central sun
- Orbiting domain planets
- Attached planet trails
- Focused domain zoom view
- Animated project moons

The focused domain view appears when a domain planet is selected.

## Data Flow

Current data flow:

```text
Static portfolio data
  -> normalization and validation helpers
  -> public portfolio helpers
  -> public UI components
  -> homepage, domain views, and project routes
```

Admin foundation data flow:

```text
Static portfolio data
  -> normalization and validation helpers
  -> CMS helpers
  -> protected GitHub-only admin routes
```

Future data flow:

```text
GitHub-only admin/CMS
  -> database-backed content
  -> portfolio helper layer
  -> public UI and protected admin views
```

## Main Concepts

### Domain

A domain is a major category of Abhik C. Shil's work. Examples include:

- Software
- Hardware
- Music
- Visuals

Domains render as homepage planets.

### Project

A project is a portfolio item such as:

- AnTix
- SoulFrame
- Tranquility
- SpotiSync
- FlexPOS

Projects render as moons in focused domain views.

### Project-Domain Placement

A project can appear under multiple domains. Each placement controls:

- Which domain the project appears under
- Its order in that domain
- Whether it is featured in that context
- An optional label override

## Rendering Rules

- Public UI should use public helper functions.
- Protected admin pages should use CMS helper functions.
- Public pages should not show draft, private, archived, or disabled content.

## Animation Rules

- Planet and moon motion should stay deterministic.
- Avoid render-time randomness.
- Respect reduced-motion preferences.
- Do not add transform transitions to moving moon elements.

## Future Database Direction

The current static data model is intended to map cleanly to future database
tables:

- `PortfolioDomain` -> `Domain`
- `PortfolioProject` -> `Project`
- `ProjectDomainPlacement` -> `ProjectDomainPlacement`
- Project links -> `ProjectLink`
- Project content -> `ProjectContentSection`
- Project media -> `ProjectMedia`
