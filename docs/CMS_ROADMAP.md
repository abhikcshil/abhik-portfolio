# CMS Roadmap

## Goal

The long-term goal is to manage the Portfolio through a private website
interface instead of editing code directly.

The private admin/CMS should:

- Use GitHub as the only login method
- Restrict access to allowlisted GitHub usernames
- Manage domains, projects, placements, content, visibility, and visual settings

## Completed Foundations

### Stage 1

Typed static data model for:

- Domains
- Projects
- Project placements
- Visibility
- CMS metadata

### Stage 2

Helper layer plus UI refactor for:

- Public domains
- Public projects
- CMS domains
- CMS projects
- Domain and project lookup
- Projects by domain
- Deterministic moon layout

### Stage 3

Structured project content and reusable project page rendering groundwork.

### Stage 4

CMS/database readiness improvements:

- Visibility states
- CMS metadata
- Validation helpers
- Public-vs-CMS helper separation
- Future database mapping notes
- GitHub-only admin/CMS config placeholders

### Stage 5

GitHub-only admin/CMS foundation:

- GitHub-only auth
- Admin allowlist
- Protected `/admin`
- Read-only admin dashboard
- Read-only domains list
- Read-only projects list

### Stage 6

Database-backed project editing MVP:

- Prisma schema for domains, projects, and project-domain placements
- PostgreSQL-backed admin project list
- Seed script that imports the current static Portfolio data
- Protected project create and edit forms
- Server-side validation and admin-only writes

### Stage 7

Database-backed public Portfolio runtime:

- Public homepage reads domains and project placements from PostgreSQL
- Public domain and project pages read from database-backed public helpers
- Static portfolio data remains as the seed source and runtime fallback
- Admin project saves revalidate public cache and affected paths
- Existing solar-system visuals remain unchanged

## Next Phases

### Database

Current stack:

```text
Prisma
PostgreSQL
Render PostgreSQL, Neon, Supabase, Railway, or Vercel Postgres
```

### Editing UI

Future admin forms should cover:

- Domains
- Project placements
- Content sections
- Links
- Visual settings
- Visibility and publishing

Projects are now the first editable content type.

### Media Uploads

Possible future providers:

- UploadThing
- Cloudinary
- Supabase Storage
- S3 or R2

### Publishing Workflow

Future workflow goals:

- Drafts
- Preview
- Publish and unpublish
- Archive
- Validation before publish
- Richer cache invalidation and publishing controls
