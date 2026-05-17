# Development Guide

## Common Commands

```bash
npm install
npm run dev
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

## Public vs CMS Data

- Public UI should use public helpers.
- Protected admin/CMS views should use CMS helpers.
- Public helpers should filter out disabled, draft, private, and archived items.

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

The project is structured for a standard Next.js deployment flow. If a future
database is added, make sure production environment variables are configured
before enabling database-backed admin features.
