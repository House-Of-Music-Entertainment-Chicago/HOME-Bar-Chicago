// app/robots.js
// Served automatically at /robots.txt — this is the file-convention
// replacement for hand-writing a static robots.txt in /public.
import { SITE_CONFIG } from "@/data/site-confiig";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
