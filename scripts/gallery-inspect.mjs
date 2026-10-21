/**
 * READ-ONLY. Prints how each GalleryAlbums row stores its Media gallery
 * items, so the format the Wix dashboard writes can be compared with the
 * format the migration script wrote. Changes nothing.
 *
 *   npm run gallery:inspect
 */
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";

if (!process.env.WIX_API_KEY || !process.env.WIX_SITE_ID) {
  console.error("WIX_API_KEY / WIX_SITE_ID are not set. Run this through `npm run gallery:inspect`.");
  process.exit(1);
}

const wix = createClient({
  modules: { items },
  auth: ApiKeyStrategy({ apiKey: process.env.WIX_API_KEY, siteId: process.env.WIX_SITE_ID }),
});

const { items: rows } = await wix.items.query("GalleryAlbums").limit(100).find();
const kind = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);

console.log(`\n${rows.length} album(s) in GalleryAlbums\n`);
for (const row of rows) {
  const media = Array.isArray(row.media) ? row.media : [];
  const srcKinds = [...new Set(media.map((m) => kind(m?.src)))].join("/") || "none";
  console.log(`== "${row.title}"  sortOrder=${row.sortOrder ?? "-"}  hide=${row.hideFromWebsite ?? "-"}  items=${media.length}  src stored as: ${srcKinds}`);

  // One full example of each media type, exactly as stored.
  for (const type of ["image", "video"]) {
    const example = media.find((m) => m?.type === type);
    if (example) console.log(`   first ${type}:\n` + JSON.stringify(example, null, 2).replace(/^/gm, "     "));
  }
  console.log("");
}
