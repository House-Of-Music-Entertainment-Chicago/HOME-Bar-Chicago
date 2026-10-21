/**
 * Rewrites the Media field of the albums created by the migration script
 * into the format the Wix dashboard itself saves, so the dashboard can
 * display and edit them.
 *
 * The migration stored each item's `src` as the Media Manager file object
 * from the upload response ({ id, url, filename, width, height, ... }).
 * The dashboard stores a string ("wix:image://v1/<id>/<file>#originWidth=..")
 * plus fileName / slug / alt / description / settings, and shows anything
 * else as raw JSON it can't edit. Albums already in the dashboard's format
 * are left untouched. Nothing is uploaded; every file is already in Wix.
 *
 *   npm run gallery:fix-preview   shows what would change, changes nothing
 *   npm run gallery:fix-apply     backs up, rewrites, and verifies each album
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const COLLECTION_ID = "GalleryAlbums";

// ---- conversion (pure, exported for testing) ------------------------------

const needsFix = (item) => item && typeof item.src === "object" && item.src !== null;

// The dashboard double-encodes the file name inside a wix:video:// URI
// ("WhatsApp Video.mp4" -> "WhatsApp%2520Video.mp4"); single for images.
const enc = (name) => encodeURIComponent(name);

export function toDashboardItem(item) {
  const s = item.src;
  const title = item.title ?? "";

  if (item.type === "video") {
    if (!s.id || !s.filename || !s.width || !s.height) {
      throw new Error(`video "${title}" is missing id/filename/size in its stored data`);
    }
    // Keep the custom thumbnail the migration uploaded; otherwise Wix's own
    // first-frame poster, which is what the dashboard uses by default.
    const poster = item.thumbnail?.id
      ? { id: item.thumbnail.id, width: item.thumbnail.width, height: item.thumbnail.height }
      : { id: `${s.id}f000.jpg`, width: s.width, height: s.height };
    const slugRes =
      s.resolutions?.find((r) => r.format === "mp4" && r.quality === "480p") ??
      s.resolutions?.find((r) => r.format === "mp4");
    return {
      description: item.description ?? "",
      fileName: s.filename,
      slug: slugRes?.url ?? s.url,
      alt: "",
      src: `wix:video://v1/${s.id}/${enc(enc(s.filename))}#posterUri=${poster.id}&posterWidth=${poster.width}&posterHeight=${poster.height}`,
      title,
      type: "video",
      settings: {
        duration: 0,
        height: s.height,
        focalPoint: [0.5, 0.5],
        posters: [{ url: poster.id }],
        width: s.width,
      },
    };
  }

  if (!s.id || !s.filename || !s.width || !s.height) {
    throw new Error(`image "${title}" is missing id/filename/size in its stored data`);
  }
  return {
    description: item.description ?? "",
    fileName: s.filename,
    slug: s.id,
    alt: "",
    src: `wix:image://v1/${s.id}/${enc(s.filename)}#originWidth=${s.width}&originHeight=${s.height}`,
    title,
    type: "image",
    settings: { focalPoint: [0.5, 0.5], height: s.height, width: s.width },
  };
}

export function fixAlbumMedia(media) {
  return media.map((item) => (needsFix(item) ? toDashboardItem(item) : item));
}

// ---- run --------------------------------------------------------------------

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) await main();

async function main() {
  const APPLY = process.argv.includes("--apply");
  if (!process.env.WIX_API_KEY || !process.env.WIX_SITE_ID) {
    console.error("WIX_API_KEY / WIX_SITE_ID are not set. Run this through `npm run gallery:fix-preview`.");
    process.exit(1);
  }
  const wix = createClient({
    modules: { items },
    auth: ApiKeyStrategy({ apiKey: process.env.WIX_API_KEY, siteId: process.env.WIX_SITE_ID }),
  });

  const { items: rows } = await wix.items.query(COLLECTION_ID).limit(100).find();
  const toFix = rows.filter((r) => Array.isArray(r.media) && r.media.some(needsFix));
  const fine = rows.filter((r) => !toFix.includes(r));

  console.log(`\n${rows.length} album(s). To fix: ${toFix.length}. Already in dashboard format: ${fine.map((r) => `"${r.title}"`).join(", ") || "none"}\n`);

  // Convert everything first, so a bad item stops the run before any write.
  const plans = toFix.map((row) => ({ row, media: fixAlbumMedia(row.media) }));
  for (const { row, media } of plans) {
    const n = row.media.filter(needsFix).length;
    console.log(`  "${row.title}": ${n} of ${row.media.length} items to convert`);
  }

  const sample = plans.flatMap((p) => p.row.media.map((before, i) => ({ before, after: p.media[i] })));
  for (const type of ["image", "video"]) {
    const ex = sample.find((x) => x.before.type === type && needsFix(x.before));
    if (ex) console.log(`\n  Example ${type} after conversion:\n` + JSON.stringify(ex.after, null, 2).replace(/^/gm, "    "));
  }

  if (!APPLY) {
    console.log("\nPreview only. Nothing was changed. Next: npm run gallery:fix-apply");
    return;
  }
  if (!plans.length) {
    console.log("\nNothing to fix.");
    return;
  }

  const backupFile = path.join(process.cwd(), "scripts", `.gallery-media-backup-${Date.now()}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(toFix, null, 2));
  console.log(`\nBackup of the ${toFix.length} albums as they are now: ${backupFile}\n`);

  for (const { row, media } of plans) {
    process.stdout.write(`  "${row.title}" ... `);
    await wix.items.update(COLLECTION_ID, { ...row, media });

    const saved = await wix.items.get(COLLECTION_ID, row._id);
    const ok =
      Array.isArray(saved.media) &&
      saved.media.length === media.length &&
      saved.media.every((m, i) => typeof m.src === "string" && m.src.startsWith("wix:") && m.title === media[i].title);
    if (!ok) {
      console.log("FAILED");
      console.error(`\nStopped: "${row.title}" did not save as expected. Nothing after it was changed.`);
      console.error(`The backup above holds every album's previous Media data. Saved value:\n${JSON.stringify(saved.media, null, 2).slice(0, 1500)}`);
      process.exit(1);
    }
    console.log(`ok (${saved.media.length} items)`);
  }
  console.log("\nAll albums fixed. Check them in the Wix dashboard.");
}
