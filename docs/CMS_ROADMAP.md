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

## Next Phases

### Database

Likely future stack:

```text
Prisma
PostgreSQL
Neon, Supabase, Railway, or Vercel Postgres
```

### Editing UI

Future admin forms should cover:

- Domains
- Projects
- Project placements
- Content sections
- Links
- Visual settings
- Visibility and publishing

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
