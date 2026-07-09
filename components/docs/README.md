# Components Structure

This folder now has grouped entrypoints to make discovery easier while preserving existing component files.

## Main grouped imports

- `@/components/layout`
  - `Navbar`, `Footer`, `TopBanner`, `FloatingActions`, `Breadcrumbs`, `FooterSchema`
- `@/components/sections/home`
  - Homepage sections and promo blocks
- `@/components/sections/contact`
  - Contact page section components
- `@/components/sections/listing`
  - Listing page sections (deals, destinations, services)
- `@/components/cards`
  - Card-level reusable components
- `@/components/ui`
  - Shared UI primitives and icon adapter

## Migration approach

- Existing files remain in place for compatibility.
- New/updated pages should prefer grouped entrypoints above for cleaner imports.
