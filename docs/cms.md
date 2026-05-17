# GitHub-only Admin/CMS Foundation

Stage 5 adds the first protected admin foundation for the Portfolio.

## Required Environment Variables

Set these in local development and production when you want GitHub auth to
work:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
CMS_ADMIN_GITHUB_USERNAMES=
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

## Access Model

- GitHub is the only sign-in provider.
- Public Portfolio pages stay open to everyone.
- `/admin` and nested admin routes require an authenticated GitHub user.
- The GitHub username must also be present in `CMS_ADMIN_GITHUB_USERNAMES`.

## Current Scope

- Read-only admin dashboard
- Read-only domains list
- Read-only projects list
- Protected route structure for future CMS work

## Later Phases

Future stages will add editing forms, publishing controls, media workflows, and
database-backed writes.
