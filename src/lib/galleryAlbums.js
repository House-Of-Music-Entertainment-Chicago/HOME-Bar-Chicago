import { media } from "@wix/sdk";
import { resolveImage } from "./wixResolveImage";

/**
 * Turns raw GalleryAlbums rows from the Wix CMS into what the gallery
 * renders. Pure (no Wix connection), so it can be checked against sample
 * data without credentials. getGalleryAlbums.js does the actual query.
 *
 * A Media gallery item is stored the way the Wix dashboard saves it, with
 * `src` as a string:
 *
 *   photo  { type: "image", title, fileName, settings: { width, height },
 *            src: "wix:image://v1/<id>/<file>#originWidth=..&originHeight=.." }
 *   video  { type: "video", title, fileName, settings: { width, height },
 *            src: "wix:video://v1/<id>/<file>#posterUri=<image id>&posterWidth=.." }
 *
 * The object form (`src: { url, width, height, resolutions[] }`) is also
 * read. The original migration script wrongly stored items that way, and
 * the dashboard can't edit them (scripts/gallery-fix-media.mjs converts
 * them); it's kept so such an item still renders if one ever appears.
 */

const PREFERRED_SHORT_SIDE = 720;

/**
 * Wix transcodes every uploaded video and names each copy by its height
 * ("720p" = 720px tall). For a vertical phone video that makes "720p" only
 * ~406px wide, so pick by the shorter side instead: the smallest copy that
 * is at least 720px on its short side (1080p for a vertical video, 720p for
 * a landscape one), then smaller copies, then the original file. The
 * browser moves down the list if a URL fails.
 */
function videoSourcesFromObject(src) {
  const shortSide = (r) => Math.min(r.width ?? 0, r.height ?? 0);
  const mp4 = (src.resolutions ?? [])
    .filter((r) => r.format === "mp4" && r.url && !r.private)
    .sort((a, b) => shortSide(a) - shortSide(b));
  const preferred = mp4.findIndex((r) => shortSide(r) >= PREFERRED_SHORT_SIDE);
  const ordered =
    preferred === -1
      ? mp4.reverse() // all small: best available first
      : [mp4[preferred], ...mp4.slice(0, preferred).reverse()];
  return [...ordered.map((r) => r.url), src.url].filter(Boolean);
}

// The "wix:video://" string form (what the dashboard saves) carries no
// transcode list, so guess the sizes and let missing ones fail over. The
// item's settings hold the video's size: a vertical video starts at 1080p,
// since its "720p" copy is only ~406px wide.
function videoSourcesFromUri(uri, settings) {
  const vertical = (settings?.height ?? 0) > (settings?.width ?? 0);
  const sizes = vertical ? ["1080p", "720p", "480p", "360p"] : ["720p", "480p", "360p"];
  return [
    ...sizes.map((r) => media.getVideoUrl(uri, r).url),
    media.getVideoUrl(uri).url,
  ];
}

// The dashboard pre-fills each item's Title with its file name
// ("IMG_4021.jpg"). That isn't a caption, so it falls back like a blank.
const FILE_NAME = /\.(jpe?g|png|webp|gif|heic|avif|mp4|mov|m4v|webm)$/i;

function captionFor(raw, album) {
  const title = raw.title?.trim();
  if (title && !FILE_NAME.test(title) && title !== raw.fileName) return title;
  return raw.description?.trim() || album.title;
}

function toMediaItem(raw, album, index) {
  const src = raw?.src;
  if (!src) return null;

  const caption = captionFor(raw, album);
  const id = `${album.id}-${index}`;
  const isUri = typeof src === "string";
  const isVideo =
    raw.type === "video" || (isUri && src.startsWith("wix:video://"));

  if (isVideo) {
    const sources = isUri ? videoSourcesFromUri(src, raw.settings) : videoSourcesFromObject(src);
    if (!sources.length) return null;
    const poster = isUri
      ? resolveImage(raw.thumbnail || media.getVideoUrl(src).thumbnail)
      : raw.thumbnail?.url || src.posters?.[0]?.url || null;
    return {
      id,
      type: "video",
      src: sources[0], // the first source doubles as the item's identity
      sources,
      poster,
      alt: caption,
      category: album.id,
    };
  }

  const url = isUri ? resolveImage(src) : src.url;
  if (!url) return null;
  return { id, type: "image", src: url, alt: caption, category: album.id };
}

/**
 * Pure transform from raw CMS rows to what the gallery renders, kept
 * separate from the query so it can be checked without a Wix connection.
 */
export function toGalleryAlbums(rows) {
  return rows
    // "Hide" rather than "show": a Wix checkbox nobody has touched is
    // blank, so new albums are visible by default and only a deliberate
    // tick hides one.
    .filter((row) => row.hideFromWebsite !== true && row.title?.trim())
    .sort((a, b) => {
      // Numbered albums first, in order; the rest newest first.
      const aHas = typeof a.sortOrder === "number";
      const bHas = typeof b.sortOrder === "number";
      if (aHas && bHas) return a.sortOrder - b.sortOrder;
      if (aHas !== bHas) return aHas ? -1 : 1;
      return new Date(b._createdDate) - new Date(a._createdDate);
    })
    .map((row) => {
      const album = { id: row._id, title: row.title.trim() };
      const items = (Array.isArray(row.media) ? row.media : [])
        .map((raw, i) => toMediaItem(raw, album, i))
        .filter(Boolean);
      return { ...album, items };
    })
    .filter((album) => album.items.length > 0);
}
