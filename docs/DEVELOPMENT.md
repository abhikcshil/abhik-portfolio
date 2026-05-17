# Development Guide

## Common Commands

```bash
npm install
npm run dev
npm run db:generate
npm run db:push
npm run db:seed
npm run lint
npm run build
```

## Before Committing

Run:

```bash
npm run lint
npm run build
git status --short
```

Then commit with a clear message.

## Content Editing

Current content is managed through typed data and helper layers.

Primary locations:

```text
src/data/portfolio/
src/lib/portfolio/
```

Prefer helper functions over importing raw arrays directly into UI components.

Database-backed admin project editing now also uses:

```text
prisma/
src/lib/db.ts
src/lib/cms/dbDomains.ts
src/lib/cms/dbProjects.ts
```

## Public vs CMS Data

- Public UI should use public helpers.
- Protected admin/CMS views should use CMS helpers.
- Database-backed admin project editing should use the DB helpers in
  `src/lib/cms/dbDomains.ts` and `src/lib/cms/dbProjects.ts`.
- Public helpers should filter out disabled, draft, private, and archived items.
- Public Portfolio routes still use the static portfolio helper layer in this
  milestone.

## Animation Notes

Homepage planets and project moons use deterministic orbit math.

- Do not use `Math.random()` during render.
- Do not use `Date.now()` during render if it affects initial HTML.
- Use client-side animation clocks for moving elements.

### Moving Moon Warning

Do not add either of these to moving moon elements:

```css
transition: all;
transition: transform 300ms ease;
```

Moving moons update `transform` every frame, and transform transitions can
reintroduce animation bugs. Opacity transitions are okay.

## Reduced Motion

Respect `prefers-reduced-motion: reduce`.

In reduced-motion mode:

- Planet movement should stop or simplify
- Trails should remain aligned
- Moons should remain static
- Transitions should be minimal

## GitHub-only Admin/CMS Environment Variables

The protected admin foundation uses:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
CMS_ADMIN_GITHUB_USERNAMES=
DATABASE_URL=
```

Do not commit real secrets.

## GitHub OAuth Callback URLs

Local development:

```text
http://localhost:3000/api/auth/callback/github
```

Production:

```text
https://your-domain.com/api/auth/callback/github
```

## Deployment Notes

The build script now runs `prisma generate` before `next build`.

For Render or another Postgres-backed deployment:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Set `DATABASE_URL` in the deployment environment before using admin project
editing. The public Portfolio can still build without a live database because
public routes continue using static data.

For local Prisma commands, keeping `DATABASE_URL` in `.env.local` is fine. The
Prisma config loads both `.env` and `.env.local`.
