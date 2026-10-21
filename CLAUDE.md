# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

This is the marketing website for HOME Sports Bar (Arlington Heights, IL) — a Next.js App Router site with Wix Headless as the CMS/backend for events data and form submissions.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (eslint-config-next core-web-vitals)
```

There is no test suite configured in this repo.

## Architecture

**Pages** live in `src/app/*/page.js` (about, contact, events, menu, reservations, plus home at `src/app/page.js`). Each page is a thin composition of section components — page files do not contain markup/logic themselves, they just import and stack `*Section.jsx` components in order.

**Components** are organized by role under `src/components/`:
- `layout/` — Navbar, Footer, Introsplash (intro animation), shared across all pages via `src/app/layout.js`.
- `pages/<page-name>/` — one section component per visual block of that page (e.g. `pages/about/AboutHeroSection.jsx`). `sub-components/` subfolders hold pieces used only within that page's sections.
- `utils/` — generic reusable pieces used across pages: `Container`, typography (`HeadingText`, `TitleText`, `BodyText`, `SubHeadingText`), `EventCard`/`EventCardGrid`, decorative elements (`TornPaper`, `PaperDivider`, `DividerFlourish`, `RoughBorderFrame`, `PennantTag`, `Ribbonbutton`, `DateBanner`), `InteractiveMap` (Leaflet), `NewsLetterForm`.
- `seo/LocalBusinessJsonLd.jsx` — structured data, rendered once in root layout.
- `hooks/useSafeVariants.js` — see Animation section below.

**Data layer** (`src/lib/`) — server-only Wix Headless integration:
- `wix.js` — creates the singleton `wixClient` (contacts, data/items, forms/submissions modules) using API-key auth from env vars. Marked `"server-only"`; throws at import time if `WIX_API_KEY`/`WIX_SITE_ID` are missing.
- `wixResolveImage.js` — converts a raw Wix image field into a usable URL via `@wix/sdk`'s `media.getImageUrl`.
- `get*Events.js` (`getFeaturedEvents`, `getThisWeekEvents`, `getUpcomingSpecialEvents`, `getEventsGallery`) — each queries a Wix Data collection via `wixClient.items.query(...)` and maps results into the shape the corresponding section component expects (including date/time formatting via a local `formatWhen` helper). When adding a new CMS-backed section, follow this same pattern: one fetch function per collection, called from the page/section (server component), image URLs resolved through `resolveImage`.
- `getGalleryAlbums.js` + `galleryAlbums.js` — the `/gallery` page and the About page preview strip are fully CMS-driven; there is no static gallery list in the repo. The client manages them in the Wix dashboard via the `GalleryAlbums` collection (`title`, `media` [Media gallery, each item's title is its caption], `hideFromWebsite`, `sortOrder`); each album is a filter tab. `galleryAlbums.js` is the pure transform: the Data API returns media as resolved objects (`src: { url, width, height }`, videos also `src.resolutions[]`), not `wix:image://` strings. Wix names video transcodes by height, so sources are picked by the shorter side (a vertical phone video's "720p" is only ~406px wide).
- `src/app/api/revalidate/route.js` — webhook called by Wix automations with `{ secret, target }`. `target` maps to paths (`events` → `/events`, `gallery` → `/gallery` + `/about`); no target refreshes all of them. Note that Next keeps Wix responses in its data cache across rebuilds and redeploys, so a route with `revalidate = false` stays stale indefinitely if a webhook is missed — `/gallery` and `/about` use `revalidate = 3600` as a safety net for that reason.
- `src/app/actions/wixForm.js` — single `"use server"` action (`handleWixFormSubmit`) that handles all three site forms (newsletter, private-event, contact-us). Form-to-field-key mapping is driven by env vars (`FIELD_KEYS`/`FORM_IDS`/`REQUIRED_FIELDS` objects) — adding a new Wix form means adding its form ID + field keys to `.env.local` and extending these three maps, not writing a new server action.

**`src/content/`** holds static config/content, not Wix-backed:
- `site-confiig.js` (note the typo in the filename — this is intentional/existing, don't "fix" it without updating all imports) exports `SITE_CONFIG`, the single source of truth for business name, description, address, geo-coordinates, phone, and social links. Consumed by root `layout.js` metadata, `robots.js`, `sitemap.js`, `opengraph-image.jsx`, and `LocalBusinessJsonLd`. Has known TODOs inline (placeholder domain, unconfirmed geo precision, address not yet propagated to `LocationSection.jsx`/`ContactInfoStrip.jsx`) — check the comments in this file before treating its values as final.
- `animation-variants.js` — shared Framer Motion variants (`headerVariants`, `buttonVariants`, `groupVariants`, `itemVariants`, `reducedVariants`) and the shared `EASE` curve. Reuse these instead of inlining new variant objects in components.
- `nav-links.js`, `social-links.js`, `external-links.js`, `features-icons.js`, `business-info.js` — other static content feeding the layout/nav and static sections.

## Animation conventions

Framer Motion is used throughout for scroll/entrance animations, driven by the shared variants in `src/content/animation-variants.js`. Because `useReducedMotion()` reads a browser setting, calling it directly in a server-rendered component causes a hydration mismatch (server doesn't know the client's preference). The fix used everywhere in this codebase is the `useSafeVariants()` hook (`src/components/hooks/useSafeVariants.js`): it returns full variants during SSR/first mount and swaps to `reducedVariants` only after mount, once the real preference is known. New animated components should call `useSafeVariants()` and wrap their variant objects with it rather than calling `useReducedMotion()` directly.

## Styling

Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`, no `tailwind.config.js`). Design tokens are defined as CSS custom properties in `src/app/globals.css` and mapped into Tailwind utilities there (`bg-background`, `text-foreground-muted`, `bg-accent`, `border-card-border`, etc.) — add new brand colors/radii there, not as raw hex values in components. Two custom fonts are loaded in `layout.js` via `next/font/google` (`Bebas_Neue` → `--font-heading`/`font-display` utility, `Montserrat` → `--font-body`) for the dark, gritty sports-bar aesthetic (near-black base, burnt-orange `--accent`). Reusable visual utilities (`.torn-edge`, `.card-outlined`, `.btn-cta`) are defined in the `@layer utilities` block in `globals.css` rather than repeated as component-level class strings.

## Path aliases

`@/*` maps to `src/*` (configured in `jsconfig.json`).

## Environment variables (`.env.local`, gitignored)

- `NEXT_PUBLIC_SITE_URL` — canonical site URL, required for `metadataBase` and absolute OG/sitemap URLs.
- `WIX_API_KEY`, `WIX_SITE_ID` — Wix Headless auth.
- `WIX_NEWSLETTER_FORM_ID`, `WIX_PRIVATE_EVENT_FORM_ID`, `WIX_CONTACT_US_FORM_ID` — Wix form IDs.
- `WIX_NEWSLETTER_FIELD_*`, `WIX_PRIVATE_EVENT_FIELD_*`, `WIX_CONTACT_US_FIELD_*` — per-form field keys consumed by `src/app/actions/wixForm.js`.

`next.config.mjs` allowlists `static.wixstatic.com` as a remote image host — any new Wix-hosted image domain needs to be added there too. (Gallery videos play from `video.wixstatic.com` through a plain `<video>`, which needs no allowlisting.)
