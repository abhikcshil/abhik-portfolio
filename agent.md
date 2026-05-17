# AGENTS.md — Portfolio Website

## Project Purpose

This repo powers Abhik C. Shil’s personal portfolio website.

The site is designed to be more than a standard portfolio. Its core concept is an interactive, space-inspired portfolio system where major areas of work and life are represented as planets, and projects appear as moons connected to those planets.

The site should present Abhik as a multidisciplinary builder across software, hardware, music, visuals, systems, and future creative/technical domains.

The long-term goal is to keep the public UI visually memorable while making the content system modular enough that domains, projects, and project pages can be added, removed, reordered, or edited without rewriting the UI.

## Core Product Idea

The homepage is an interactive solar-system-style navigation interface.

Conceptually:

- The central sun represents Abhik.
- Major domains are planets orbiting the center.
- Clicking a planet zooms into that domain.
- Projects appear as moons around the selected planet.
- A project can belong to multiple planets.
- Project pages act as case studies.
- The visual system should automatically adapt as content changes.

The current site should preserve the feeling of a polished cinematic portfolio, not a generic developer template.

## Design Direction

The visual tone should feel:

- Dark
- Cinematic
- Premium
- Minimal
- Technical
- Calm
- Mature
- Space-inspired
- Systems-oriented
- Creative without feeling childish

Avoid:

- Cartoonish planets
- Overdone neon
- Game-menu clutter
- Heavy 3D dependencies unless explicitly requested
- Generic landing page layouts
- Random animations without purpose
- Overly complex UI that hurts readability

The site should feel like a clean orbital interface, not a toy solar system.

## Current Core UI

The current public experience includes:

- Full-screen homepage solar-system scene
- Sharp starfield background
- Bright central sun displaying “Abhik C. Shil”
- Orbiting domain planets
- Attached fading planet trails
- Click-to-zoom domain transition
- Focused planet/moon system view
- Moving project moons
- Project placeholder/detail routes
- Reduced-motion support
- Keyboard-accessible domain/project navigation

Do not regress these features unless the task explicitly asks for a redesign.

## Technical Stack

Use the existing stack unless there is a strong reason to change it:

- Next.js App Router
- TypeScript
- Tailwind CSS
- CSS transforms/animations
- Existing animation utilities where already present
- Auth.js / NextAuth for GitHub-only admin auth if applicable
- Future database likely Prisma + Postgres, but do not add unless the task asks

Avoid adding heavy dependencies without clear value.

Do not add:

- Three.js
- React Three Fiber
- Large animation engines
- Unnecessary UI frameworks
- CMS/database dependencies unless the task specifically enters that phase

## Content System Direction

The portfolio should be data-driven.

The UI should not hardcode specific domains or projects. It should render from structured data and helper functions.

Domains represent planets.

Projects represent moons.

Projects can be assigned to multiple domains.

Project order within a domain controls how close that project appears to the center in the focused domain view.

A project like SoulFrame may appear under both Software and Hardware.

A project like SpotiSync may appear under both Software and Music.

A project like Camera Rig may appear under both Hardware and Visuals.

The site should remain easy to evolve if domains are renamed, hidden, reordered, added, or removed.

## Data Model Principles

Prefer a CMS-ready model even when data is static.

Use typed structures for:

- Domains
- Projects
- Project-domain placements
- Project statuses
- Visibility states
- CMS metadata
- Project content sections
- Project links
- Project visuals

Keep public-facing helpers separate from CMS/admin helpers.

Public helpers should only return public, enabled content.

CMS/admin helpers may return draft, private, archived, or disabled content.

Do not use `Math.random()`, `Date.now()`, or `new Date()` during render in a way that can cause hydration mismatches.

## Project Page Direction

Project pages should eventually become reusable case-study pages.

A strong project page should support:

- Hero section
- Project title
- Tagline
- Status
- Domain tags
- Tech stack
- Links
- Overview
- Problem
- Solution
- Key features
- Technical build
- Challenges
- Lessons learned
- Future plans
- Media/screenshots

Do not invent metrics, users, revenue, employers, awards, or production claims unless they are already provided in the data.

## Private CMS Direction

The long-term private CMS should allow Abhik to manage portfolio content through a protected website interface.

The intended auth method is GitHub-only login.

Only allowlisted GitHub usernames should access private admin pages.

Public pages must remain visible to everyone.

Admin pages should never rely only on client-side protection.

Private CMS goals may eventually include:

- Add/edit/remove domains
- Add/edit/remove projects
- Assign projects to multiple domains
- Reorder projects per domain
- Edit project content pages
- Toggle visibility and draft status
- Manage project links and media
- Validate portfolio data

Do not build database writes, admin editing forms, uploads, or full CMS behavior unless explicitly requested.

## Homepage / Orbit System Guidelines

Planets should remain circular and readable.

Labels should remain upright.

Do not put planet labels inside a tilted 3D plane.

Do not flatten planets into ellipses.

Planet motion should be screen-space circular motion unless a future redesign explicitly changes this.

Planet trails should remain visually attached to the planet. The trail should be generated from the same current angle as the planet, not from independent decorative dash animations.

Reduced motion must be respected.

If `prefers-reduced-motion: reduce` is active:

- Homepage planet motion should stop or simplify.
- Planet trails should stay attached statically.
- Project moons should stop orbiting.
- Transitions should be minimal or instant.

## Focused Domain / Moon System Guidelines

The focused domain view should feel like zooming into a local moon system.

The selected domain planet becomes the central body.

Projects render as moons around it.

All moons should use deterministic orbit logic.

Moon movement should be slow, calm, and premium.

Labels should stay readable and upright.

Do not add transform transitions to continuously moving moon elements. A previous bug occurred when `transition: transform` restarted every frame and caused only one moon to visibly move.

Opacity transitions are acceptable for entry reveal.

Avoid `transition: all`.

## Accessibility Requirements

Interactive planets and moons must be keyboard accessible.

Use real links or buttons depending on behavior.

Decorative visuals should use:

```tsx
aria-hidden="true"
pointer-events: none

Focus styles must remain visible.

Do not sacrifice accessibility for visual polish.

## Responsiveness

The homepage should remain full-screen and usable across desktop and mobile.

Avoid cropping planets, labels, the central sun, or the focused moon system.

Use responsive sizing and clamp() where appropriate.

Admin pages can be normal scrollable pages.

Project pages can be normal scrollable pages.

Coding Standards

Use:

TypeScript
Small focused React components
Clear component names
Typed data and helper functions
Tailwind for layout/common styling
Global CSS for shared scene animations and visual primitives
Deterministic layout calculations

Avoid:

Massive single-file components
Hardcoded project/domain branching
Magic numbers without context
Overly clever abstractions
Runtime randomness in render
Unnecessary state
Unnecessary dependencies

Comment non-obvious orbit math, layout math, and auth/security behavior.

File Organization Preferences

Preferred general organization:

src/
  components/
    home/
    project/
    admin/
  config/
  data/
    portfolio/
  lib/
    portfolio/
    cms/
  types/
app/
  admin/
  projects/
docs/

Follow existing repo conventions when they differ, but keep the structure clean.

Development Commands

Use:

npm run dev
npm run lint
npm run build

Before finishing a task, run:

npm run lint
npm run build

If either fails, fix the issue or clearly explain the failure.

Do not run:

npm audit fix --force

unless explicitly instructed.

Important Do-Not-Regress List

Do not break:

Homepage solar-system scene
Central sun/name
Domain planets
Attached planet trails
Domain zoom transition
Focused moon system
Moving moons
Reduced motion
Keyboard accessibility
Public content filtering
Project routes
Build/lint

Do not reintroduce:

Detached fragmented orbit trails
Dashed trail artifacts
Global blur that makes the scene look low-resolution
Flattened planets
Rotated/skewed labels
transition: transform on moving moon elements
Hardcoded project/domain-specific rendering logic
See [AGENTS.md](AGENTS.md).
