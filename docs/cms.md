# GitHub-only Admin/CMS

The Portfolio admin/CMS now powers both protected project editing and the
public Portfolio runtime through Prisma and PostgreSQL, with a static fallback
layer for resilience.

## Required Environment Variables

Set these in local development and production when you want GitHub auth to
work:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
CMS_ADMIN_GITHUB_USERNAMES=
DATABASE_URL=
```

`CMS_ADMIN_GITHUB_USERNAMES` should be a comma-separated allowlist of GitHub
usernames:

```env
CMS_ADMIN_GITHUB_USERNAMES=your-github-username,another-admin
```

## GitHub OAuth App

Create a GitHub OAuth app and configure these callback URLs.

Local development:

```text
http://localhost:3000/api/auth/callback/github
```

Production:

```text
https://your-domain.com/api/auth/callback/github
```

Use the GitHub app's client id and client secret for `AUTH_GITHUB_ID` and
`AUTH_GITHUB_SECRET`.

`DATABASE_URL` should point to a PostgreSQL database. On Render, use a Render
PostgreSQL connection string or another managed Postgres provider.

For local development, `DATABASE_URL` can live in `.env.local`.

## Access Model

- GitHub is the only sign-in provider.
- Public Portfolio pages stay open to everyone.
- `/admin` and nested admin routes require an authenticated GitHub user.
- The GitHub username must also be present in `CMS_ADMIN_GITHUB_USERNAMES`.
- Admin project writes require a configured PostgreSQL database.

## Current Scope

- Admin dashboard with database status messaging
- Database-backed project list
- Project create and edit forms
- Read-only domain previews
- Protected server-side admin actions
- Database-backed public Portfolio helpers with static fallback

## Database Setup

Run these commands after adding `DATABASE_URL`:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

You can inspect records with:

```bash
npm run db:studio
```

The seed script imports the current static portfolio domains and projects into
PostgreSQL and upserts matching ids so the setup can be rerun without creating
duplicates.

## Public Runtime

The public Portfolio now prefers the CMS database and falls back to the static
portfolio data when the database is unavailable or unseeded.

- The homepage solar-system UI reads public domains and project placements from
  database-backed public helpers.
- Domain pages and project pages also use the database-backed public helper
  layer.
- Public filters still exclude disabled, draft, private, and archived content.
- Static portfolio data remains in the repo as the seed source and fallback.
- Public helper caching uses a short revalidation window and admin project
  saves explicitly revalidate the public Portfolio cache and affected paths.

## Later Phases

Future stages will add more editing surfaces, publishing controls, and media
workflows on top of the new public DB-backed runtime.
