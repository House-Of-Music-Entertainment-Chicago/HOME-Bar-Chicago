# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: local and visiting patrons in the Chicago NW suburbs deciding, in the moment or a few days out, where to eat, drink, watch a game or UFC card, and be entertained tonight or this weekend. They browse the site to check tonight's/this week's lineup, the menu, and whether to make a reservation.

Secondary: people actively shopping for a venue to host a private or corporate event (the dedicated Reservations-page private-event form and inquiry flow exist for this), but this is a smaller, secondary line — the site's primary job is walk-in-patron marketing, not event-sales lead gen.

## Product Purpose

Marketing and information site for HOME Sports Bar, a physical sports bar and entertainment venue in Arlington Heights, IL. It informs prospective and returning patrons about the venue, menu, and events calendar, and converts that interest into visits, reservations, and (secondarily) private-event inquiries and newsletter signups. There is no e-commerce, ordering, or checkout on the site — success is driving foot traffic and qualified leads, not online transactions.

## Positioning

The breadth of the activity mix under one roof — golf simulators, billiards, live music/DJ sets, UFC watch parties, and wall-to-wall HD screens for every game — positions HOME as an entertainment destination, not just "a bar with TVs." A neighboring sports bar with only screens and a kitchen could not truthfully make the same claim.

## Operating Context

Physical venue at 1227 N. Rand Road, Arlington Heights, IL 60004, in the northwest suburbs of Chicago. Events content (Featured Events, This Week's lineup, Upcoming Special Events, Events Gallery) is pulled live from Wix Data collections, so staff update it in Wix without a code deploy. Three lead-capture forms (newsletter signup, private-event inquiry, contact us) submit through Wix Forms into Wix CRM, which handles contact creation, labeling, and inbox routing via Wix Automation — there is no in-app inbox or notification system to maintain.

## Capabilities and Constraints

- CMS-backed events data only; menu, hours, and core page content are static/code-driven, not CMS-editable.
- Adding a new Wix-backed form means adding env vars and extending the field/ID maps in `src/app/actions/wixForm.js`, not writing a new server action.
- Production domain is not yet finalized — `NEXT_PUBLIC_SITE_URL` is a placeholder, which SEO metadata, the sitemap, and OG image resolution all depend on.
- Address/geo-coordinates in `SITE_CONFIG` (the single source of truth) have not yet been propagated to `LocationSection.jsx` and `ContactInfoStrip.jsx`, which still show outdated placeholder values.
- Site is not yet deployed to a production domain or submitted for Google indexing.
- Testimonials (`TestimonialSection`) and venue stats (`StatsSection`: screen count, seats, play areas, events/month) are currently placeholder copy, not verified real figures or real customer quotes — do not treat them as evidence when documenting or redesigning; replace with real data before shipping any surface that depends on them.

## Brand Commitments

Name: "HOME Sports Bar" ("HOME Sports Bar — Play — Entertainment"). Location, phone ((847) 577-4663), email (info@homebarchicago.com), and social presence (Facebook, Instagram, Twitter/X, YouTube) are confirmed real business facts, defined centrally in `src/data/site-confiig.js`.

**Not durable — slated for replacement:** the current burnt-orange accent color (`--accent #e8531e`, used throughout the design system: CTAs, card borders, hover states) and the current logo. Per explicit stakeholder note (`data-info-assets/informations/TO_UPDATE.txt`: "orange gotta go," "change to latest logo"), both are pending replacement. Treat the current implementation as evidence of the incumbent look only, not as a fixed brand commitment for new design work.

**Not yet reconfirmed, treat as tentative:** the broader dark, gritty sports-bar aesthetic (near-black base, condensed Bebas Neue display headlines + Montserrat body) and the current photography — `TO_UPDATE.txt` also calls for "new pictures." Nothing indicates the dark base concept itself is being discarded, but it hasn't been explicitly reconfirmed either.

## Evidence on Hand

Real address, phone, email, and social links (see `SITE_CONFIG`). A real drinks menu PDF exists at `data-info-assets/assets/Drinks Menu - HOME bar.pdf`. Venue and gallery photography exists under `data-info-assets/assets/`, though some is flagged for replacement (see Brand Commitments). No real testimonials, reviews, or verified venue stats exist yet — current copy in those sections is placeholder and must not be treated as fact.

## Product Principles

- Answer "what's happening here tonight/this week" fast — events content and the activity mix are the primary hook, not a generic bar pitch.
- Every page should make it obvious how to get there or book it — reservations, directions, and contact info should never be more than a click away.
- Treat Wix as the content system of record for events and lead capture; don't hardcode what staff need to change without a deploy.
- Preserve the confirmed real business facts (location, contact info, socials) as ground truth; don't let placeholder content (stats, testimonials) leak into anything presented as verified.
