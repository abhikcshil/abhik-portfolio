# Abhik C. Shil Portfolio

This repository contains Abhik C. Shil's Portfolio, built with Next.js,
TypeScript, and Tailwind CSS. The public experience uses an interactive
solar-system UI where domains are planets and projects are moons, while the
admin CMS now uses GitHub-only authentication plus a PostgreSQL-backed project
editing foundation.

## Current Features

- Cinematic solar-system homepage
- Central sun with Abhik C. Shil's name
- Orbiting domain planets with attached trails
- Zoom-in domain view with animated project moons
- Project routes powered by a reusable, data-driven content model
- CMS-ready portfolio structure with public and CMS helper layers
- GitHub-only admin/CMS with protected database-backed project editing
- Reduced-motion support
- Responsive layout across desktop and mobile

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- CSS animations and transforms
- Auth.js / NextAuth for GitHub-only admin authentication
- Prisma and PostgreSQL for admin project editing

## Project Structure

```text
app/
  admin/
  api/
  page.tsx
  projects/
  [domain]/
src/
  components/
    admin/
    home/
  config/
  data/
    portfolio/
  lib/
    cms/
    portfolio/
  types/
docs/
auth.ts
README.md
AGENTS.md
```

## Development

```bash
npm install
npm run dev
npm run db:generate
npm run db:push
npm run db:seed
npm run lint
npm run build
```

## Environment Variables

The GitHub-only admin/CMS foundation expects these variables when you want to
use admin authentication locally or in production:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
CMS_ADMIN_GITHUB_USERNAMES=
DATABASE_URL=
```

`CMS_ADMIN_GITHUB_USERNAMES` should be a comma-separated allowlist of GitHub
usernames. `DATABASE_URL` should point to a PostgreSQL database for the admin
CMS.

## Content Model

- Domains are the homepage planets.
- Projects are moons shown inside focused domain views.
- Projects can belong to multiple domains through domain placements.
- Placement order controls moon distance from the center.
- Public helpers filter visible content for the public Portfolio.
- Admin CMS helpers now read and write project records in PostgreSQL.
- Public Portfolio pages still use the static portfolio data layer in this pass.

## Documentation

- [AGENTS.md](AGENTS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Content Model](docs/CONTENT_MODEL.md)
- [CMS Roadmap](docs/CMS_ROADMAP.md)
- [Development](docs/DEVELOPMENT.md)

## Status

This is an actively evolving personal Portfolio. The public experience is live
in code today, and the private GitHub-only admin/CMS is being built in phases.
The current milestone adds database-backed admin project editing without
changing the public Portfolio runtime.
