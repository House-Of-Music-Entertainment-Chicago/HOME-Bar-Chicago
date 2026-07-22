// app/sitemap.js
// Served automatically at /sitemap.xml. Static route list for now —
// if any of these pages later gets real dynamic content (e.g. a
// blog, or individual event pages), extend this by fetching those
// entries and mapping them in alongside ROUTES below.
import { SITE_CONFIG } from "@/data/site-confiig";

const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
  { path: "/events", priority: 0.9, changeFrequency: "daily" },
  { path: "/reservations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
