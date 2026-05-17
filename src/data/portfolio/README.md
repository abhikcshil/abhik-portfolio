# Portfolio Data

This folder is the static source of truth for the Portfolio until the future
GitHub-only admin/CMS moves content management behind protected tooling.

## Add a Domain

Add a new entry in `domains.ts` with:

- A stable `id`
- A URL-safe `slug`
- A public-facing `label`
- `visibility` and `enabled` state
- `order`
- Visual settings
- CMS metadata

## Rename a Domain Label

Change `label` and optionally `shortLabel`. Keep the `id` stable if
relationships and route references should continue working.

## Add a Project

Add a new entry in `projects.ts` with:

- A stable `id`
- A URL-safe `slug`
- `title`, `tagline`, and `summary`
- `visibility` and `enabled` state
- Domain placements
- Optional visual overrides
- Optional structured content
- CMS metadata

## Place a Project in Multiple Domains

Add multiple objects to the project's `domains` array. Each placement can
define:

- `domainId`
- `order`
- `featured`
- `labelOverride`

## Order and Moon Distance

Placement `order` is the domain-specific ordering source of truth. Lower order
values are closer to the center, and the moon layout helper derives distance
from that order when no explicit visual override exists.

## Visibility

Use `visibility: "public"` for content that should appear in the public
Portfolio. `draft`, `private`, and `archived` content remain available to CMS
helpers and protected admin views, but they are filtered out of the public UI.

## Later

The data model is intentionally shaped to map cleanly into a future
GitHub-only admin/CMS and database-backed workflow.
