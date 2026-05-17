# Portfolio Content Model

## Purpose

The Portfolio content model is designed so domains, projects, and project pages
can evolve without rewriting the UI. The current implementation uses static
TypeScript data, but the structure is intentionally compatible with a future
GitHub-only admin/CMS and database-backed workflow.

## Domains

Domains are the major planets on the homepage.

A domain includes:

```text
id
slug
label
shortLabel
description
enabled
visibility
order
href
visual settings
CMS metadata
```

Changing a domain label should not require changing the internal domain `id`.
For example, `visuals` could later be relabeled without changing relationships.

## Projects

Projects are moons shown inside focused domain views.

A project includes:

```text
id
slug
title
shortTitle
tagline
summary
status
enabled
visibility
domain placements
tech stack
highlights
links
visual settings
content sections
CMS metadata
```

## Multi-Domain Projects

A project can belong to multiple domains.

Examples:

- SoulFrame -> software, hardware
- SpotiSync -> software, music
- Camera Rig -> hardware, visuals

This relationship is handled through project-domain placements.

## Project Ordering

Project order is domain-specific.

- `order: 1` means closest to the center
- Larger order values place moons farther outward
- A project can have different order values in different domains

## Visibility

Content supports these states:

- `public`
- `private`
- `draft`
- `archived`

The public Portfolio should only show enabled, public content. CMS helpers may
expose a broader read-only view for protected admin routes.

## Project Page Sections

Project pages can support structured sections such as:

- Hero
- Overview
- Problem
- Solution
- Features
- Technical details
- Challenges
- Lessons learned
- Future plans
- Links
- Media

Not every project needs every section immediately.

## Content Guidelines

Project content should be clear, truthful, and specific. Avoid inventing:

- Metrics
- Users
- Revenue
- Awards
- Employment claims
- Production usage claims that do not exist

Use placeholders or omit fields when details are not ready.
