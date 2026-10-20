/**
 * One-time move of the gallery from the repo into the Wix CMS.
 *
 * Reads the current list in src/content/gallery-images.js, uploads every
 * photo and video to the site's Wix Media Manager, and creates one
 * GalleryAlbums row per gallery category (The Venue, Play, ...) with the
 * captions already filled in. After this, the client manages everything
 * from the Wix dashboard.
 *
 *   npm run gallery:migrate -- --check                   read-only: verify the table's field IDs
 *   npm run gallery:migrate                              preview only, changes nothing
 *   npm run gallery:migrate -- --apply --first-album-only  trial: moves one album
 *   npm run gallery:migrate -- --apply                   moves everything
 *
 * Safe to re-run: uploads are remembered in scripts/.gallery-migration.json
 * (gitignored) and albums whose title already exists in Wix are skipped.
 *
 * Needs WIX_API_KEY / WIX_SITE_ID (loaded by the npm script) with
 * permission to manage Media Manager files and CMS collection items.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { files } from "@wix/media";

const ROOT = process.cwd();
const COLLECTION_ID = "GalleryAlbums";
const MANIFEST = path.join(ROOT, "scripts", ".gallery-migration.json");
const APPLY = process.argv.includes("--apply");
const FIRST_ONLY = process.argv.includes("--first-album-only");
const CHECK = process.argv.includes("--check");

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};

function connect() {
  if (!process.env.WIX_API_KEY || !process.env.WIX_SITE_ID) {
    console.error("WIX_API_KEY / WIX_SITE_ID are not set. Run this through `npm run gallery:migrate`.");
    process.exit(1);
  }
  return createClient({
    modules: { items, files },
    auth: ApiKeyStrategy({
      apiKey: process.env.WIX_API_KEY,
      siteId: process.env.WIX_SITE_ID,
    }),
  });
}

// ---- --check: read-only look at the table's real field IDs ----------------
// The Wix dashboard doesn't always show Field IDs, so this reads them from
// an actual row instead. Needs one test row with every field filled in
// (Wix leaves empty fields out of the data entirely).
const EXPECTED_FIELDS = {
  title: "Title (album name)",
  media: "Media (Media gallery)",
  hideFromWebsite: "Hide from website (Boolean, ticked)",
  sortOrder: "Sort order (Number)",
};

if (CHECK) {
  const wix = connect();
  const { items: rows } = await wix.items.query(COLLECTION_ID).limit(10).find();
  if (!rows.length) {
    console.log("\nGallery Albums has no rows yet. Add one test row with every field filled in, then re-run.");
    process.exit(1);
  }
  const found = new Set(rows.flatMap((r) => Object.keys(r).filter((k) => !k.startsWith("_"))));
  console.log(`\nRead ${rows.length} row(s) from ${COLLECTION_ID}. Field IDs:\n`);
  let allGood = true;
  for (const [key, label] of Object.entries(EXPECTED_FIELDS)) {
    const ok = found.has(key);
    allGood &&= ok;
    console.log(`  ${ok ? "OK      " : "MISSING "} ${key.padEnd(16)} ${label}`);
  }
  const other = [...found].filter((k) => !(k in EXPECTED_FIELDS));
  if (other.length) console.log(`\n  Other field IDs found: ${other.join(", ")}`);

  const sample = rows.find((r) => Array.isArray(r.media) && r.media.length)?.media[0];
  if (sample) {
    const shown = { ...sample, src: typeof sample.src === "string" ? sample.src.slice(0, 50) + "..." : sample.src };
    console.log("\n  How Wix stores one Media item:\n" + JSON.stringify(shown, null, 2).replace(/^/gm, "    "));
  } else {
    console.log("\n  No row has anything in a 'media' field, so its format couldn't be checked.");
  }
  console.log(allGood ? "\nAll fields match. Delete the test row, then run the migration." : "\nSome fields don't match. Send this output to your developer.");
  process.exit(allGood ? 0 : 1);
}

// ---- build the plan from the current static gallery ----------------------
const { GALLERY_IMAGES, GALLERY_CATEGORIES } = await import(
  new URL("../src/content/gallery-images.js", import.meta.url)
);

const localFile = (publicPath) => path.join(ROOT, "public", publicPath);

const albums = GALLERY_CATEGORIES.map((category, i) => ({
  title: category.label,
  sortOrder: i + 1,
  entries: GALLERY_IMAGES.filter((e) => e.category === category.id),
})).filter((a) => a.entries.length > 0);

const missing = GALLERY_IMAGES.flatMap((e) => [e.src, e.poster])
  .filter(Boolean)
  .filter((p) => !fs.existsSync(localFile(p)));
if (missing.length) {
  console.error("These files are listed in the gallery but missing on disk:");
  missing.forEach((p) => console.error("  " + p));
  process.exit(1);
}

const bytes = GALLERY_IMAGES.flatMap((e) => [e.src, e.poster])
  .filter(Boolean)
  .reduce((sum, p) => sum + fs.statSync(localFile(p)).size, 0);

console.log(`\nPlan: ${albums.length} albums, ${GALLERY_IMAGES.length} items, ${(bytes / 1048576).toFixed(1)}MB to upload\n`);
for (const a of albums) {
  const videos = a.entries.filter((e) => e.type === "video").length;
  console.log(`  ${a.sortOrder}. ${a.title}: ${a.entries.length - videos} photos${videos ? `, ${videos} video` : ""}`);
}

if (!APPLY) {
  console.log("\nPreview only. Nothing was uploaded or created.");
  console.log("Next: npm run gallery:migrate -- --apply --first-album-only");
  process.exit(0);
}

// ---- talk to Wix -----------------------------------------------------------
const wix = connect();

const manifest = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  : { uploads: {} };
const saveManifest = () => fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

function describeError(e) {
  const code = e?.details?.applicationError?.code;
  return `${code ? `[${code}] ` : ""}${e?.message || e}`;
}

/** Uploads one local file (once) and returns its wix:image:// or wix:video:// URI. */
async function upload(publicPath) {
  if (manifest.uploads[publicPath]) return manifest.uploads[publicPath];

  const full = localFile(publicPath);
  const mimeType = MIME[path.extname(full).toLowerCase()];
  if (!mimeType) throw new Error(`No MIME type known for ${publicPath}`);

  const { uploadUrl } = await wix.files.generateFileUploadUrl(mimeType, {
    fileName: path.basename(full),
  });
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: fs.readFileSync(full),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Upload of ${publicPath} failed: HTTP ${res.status} ${text.slice(0, 300)}`);

  const file = JSON.parse(text).file;
  const uri = mimeType.startsWith("video/") ? file?.media?.video : file?.media?.image?.image;
  if (!uri) {
    throw new Error(
      `Wix accepted ${publicPath} but returned no media URI. Response:\n${text.slice(0, 1000)}`,
    );
  }

  manifest.uploads[publicPath] = uri;
  saveManifest();
  return uri;
}

async function albumExists(title) {
  const { items: found } = await wix.items.query(COLLECTION_ID).eq("title", title).limit(1).find();
  return found.length > 0;
}

const toMigrate = FIRST_ONLY ? albums.slice(0, 1) : albums;
try {
  for (const album of toMigrate) {
    if (await albumExists(album.title)) {
      console.log(`\n"${album.title}" already exists in Wix, skipping.`);
      continue;
    }

    console.log(`\n${album.title}:`);
    const mediaItems = [];
    for (const [i, entry] of album.entries.entries()) {
      process.stdout.write(`  ${i + 1}/${album.entries.length} ${entry.src} ... `);
      const src = await upload(entry.src);
      const item = { type: entry.type === "video" ? "video" : "image", src, title: entry.alt };
      if (entry.poster) item.thumbnail = await upload(entry.poster);
      mediaItems.push(item);
      console.log("ok");
    }

    const created = await wix.items.insert(COLLECTION_ID, {
      title: album.title,
      sortOrder: album.sortOrder,
      media: mediaItems,
    });

    // Read it back: if Wix silently dropped or reshaped the media list,
    // stop here rather than repeating the problem for every album.
    const saved = await wix.items.get(COLLECTION_ID, created._id);
    const savedCount = Array.isArray(saved.media) ? saved.media.length : 0;
    if (savedCount !== mediaItems.length) {
      throw new Error(
        `"${album.title}" was created but holds ${savedCount}/${mediaItems.length} media items. ` +
          `Check the "media" field is a Media Gallery field. Saved value:\n` +
          JSON.stringify(saved.media, null, 2).slice(0, 1500),
      );
    }
    console.log(`  created album with ${savedCount} items`);
  }
} catch (e) {
  console.error(`\nStopped: ${describeError(e)}`);
  console.error("Re-running is safe: finished uploads and existing albums are skipped.");
  process.exit(1);
}

console.log(
  FIRST_ONLY
    ? "\nTrial album done. Check it in the Wix dashboard, then run with --apply (without --first-album-only)."
    : "\nAll albums migrated.",
);
