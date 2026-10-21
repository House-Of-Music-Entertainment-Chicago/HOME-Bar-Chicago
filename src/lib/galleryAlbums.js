import { media } from "@wix/sdk";
import { resolveImage } from "./wixResolveImage";

/**
 * Turns raw GalleryAlbums rows from the Wix CMS into what the gallery
 * renders. Pure (no Wix connection), so it can be checked against sample
 * data without credentials. getGalleryAlbums.js does the actual query.
 *
 * What the Data API actually returns for a Media gallery item, as seen on
 * the live collection:
 *
 *   photo  { type: "image", title, src: { url, width, height, id, filename } }
 *   video  { type: "video", title, thumbnail: { url, ... },
 *            src: { url, width, height, posters: [{ url }],
 *                   resolutions: [{ quality, format, url, width, height }] } }
 *
 * The older "wix:image://v1/..." / "wix:video://v1/..." string form is
 * still handled, in case a field or API version returns that instead.
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

// Fallback for the "wix:video://" string form, where the transcode list
// isn't included, so try the common sizes and let missing ones fail over.
function videoSourcesFromUri(uri) {
  return [
    ...["720p", "480p", "360p"].map((r) => media.getVideoUrl(uri, r).url),
    media.getVideoUrl(uri).url,
  ];
}

function toMediaItem(raw, album, index) {
  const src = raw?.src;
  if (!src) return null;

  const caption = raw.title?.trim() || raw.description?.trim() || album.title;
  const id = `${album.id}-${index}`;
  const isUri = typeof src === "string";
  const isVideo =
    raw.type === "video" || (isUri && src.startsWith("wix:video://"));

  if (isVideo) {
    const sources = isUri ? videoSourcesFromUri(src) : videoSourcesFromObject(src);
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
