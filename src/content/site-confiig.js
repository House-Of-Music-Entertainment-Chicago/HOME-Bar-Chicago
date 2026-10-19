// data/site-config.js
//
// Single source of truth for anything SEO/metadata touches — the
// root layout, robots.ts, sitemap.ts, the OG image, and the JSON-LD
// structured data all read from this instead of repeating the same
// strings in five places.

export const SITE_CONFIG = {
  name: "HOME Sports Bar",
  fullName: "HOME Sports Bar — Play — Entertainment",

  // TODO: replace with the real production domain once it's live —
  // metadataBase, robots.ts, and sitemap.ts all depend on this being
  // correct, since relative OG image URLs won't resolve without it.
  url: process.env.NEXT_PUBLIC_SITE_URL,

  description:
    "HOME Sports Bar is a premier sports bar and entertainment venue in the northwest suburbs of Chicago — cold drinks, great food, live music, UFC watch parties, and every game on wall-to-wall HD screens.",

  keywords: [
    "sports bar Chicago",
    "UFC watch party",
    "live music bar",
    "billiards Chicago",
    "golf simulator bar",
    "HOME Sports Bar",
    "Arlington Heights sports bar",
  ],

  // Real business data — also needs to propagate to LocationSection.jsx
  // (still has the old Makati City placeholder coordinates) and
  // ContactInfoStrip.jsx on the Contact page, which currently show
  // the same outdated placeholder.
  address: {
    street: "1227 N. Rand Road",
    city: "Arlington Heights",
    state: "IL",
    zip: "60004",
    country: "US",
  },

  // Extracted from the Google Maps directions link — approximate to
  // ~11m precision. Worth confirming against the exact pin on the
  // business's own Google Business listing before relying on it for
  // anything precision-sensitive (e.g. embedding a map marker).
  geo: {
    latitude: 42.0999464,
    longitude: -87.9592789,
  },

  phone: "(847) 577-4663",
  // E.164 format — the form structured data (JSON-LD) and tel: links
  // should actually use, vs. the human-readable version above.
  telephoneE164: "+18475774663",
  email: "info@homebarchicago.com",

  social: {
    facebook: "https://www.facebook.com/HOME.Bar.Chicago",
    instagram: "https://www.instagram.com/homebarchicago/",
    twitter: "https://twitter.com/HOMEbarChicago",
    youtube: "https://www.youtube.com/user/HOMEHOUSEOFMUSIC",
  },
};
