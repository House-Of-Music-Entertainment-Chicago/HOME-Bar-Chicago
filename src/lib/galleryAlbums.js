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

// The item's real pixel size, so the grid can reserve its exact shape
// before the image arrives (no layout shift) and never crop it.
function dimensionsOf(raw, isUri) {
  const s = raw.settings;
  if (s?.width && s?.height) return { width: s.width, height: s.height };
  if (!isUri && raw.src?.width && raw.src?.height) {
    return { width: raw.src.width, height: raw.src.height };
  }
  const m = isUri && raw.src.match(/originWidth=(\d+)&originHeight=(\d+)/);
  if (m) return { width: Number(m[1]), height: Number(m[2]) };
  return { width: 4, height: 3 };
}

function toMediaItem(raw, album, index) {
  const src = raw?.src;
  if (!src) return null;

  const caption = captionFor(raw, album);
  const id = `${album.id}-${index}`;
  const isUri = typeof src === "string";
  const isVideo =
    raw.type === "video" || (isUri && src.startsWith("wix:video://"));
  const { width, height } = dimensionsOf(raw, isUri);

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
      width,
      height,
      alt: caption,
      category: album.id,
    };
  }

  const url = isUri ? resolveImage(src) : src.url;
  if (!url) return null;
  return { id, type: "image", src: url, width, height, alt: caption, category: album.id };
}

/**
 * URL slug from an album title: "Live & Events" -> "live-and-events".
 * Renaming an album in Wix changes its address; old links then 404.
 */
export function slugify(title) {
  return (
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "album"
  );
}

// The image an album is represented by: its first photo, else the first
// video's poster.
function coverOf(items) {
  const photo = items.find((i) => i.type === "image");
  if (photo) return { src: photo.src, width: photo.width, height: photo.height, alt: photo.alt };
  const video = items.find((i) => i.type === "video" && i.poster);
  return video ? { src: video.poster, width: video.width, height: video.height, alt: video.alt } : null;
}

/**
 * What an album card or "next album" link needs, without the album's full
 * item list: keeps the gallery index payload small however many photos the
 * albums hold. `prints` = the cover first, then up to two more photos.
 */
export function toAlbumSummary(album) {
  const pictures = album.items
    .map((i) =>
      i.type === "video"
        ? i.poster && { src: i.poster, width: i.width, height: i.height, alt: i.alt }
        : { src: i.src, width: i.width, height: i.height, alt: i.alt },
    )
    .filter(Boolean);
  const rest = pictures.filter((p) => p.src !== album.cover?.src);
  return {
    slug: album.slug,
    title: album.title,
    // Pre-formatted here so client components never import this module,
    // which would pull the Wix SDK into the browser bundle.
    countLabel: formatAlbumCount(album),
    prints: [album.cover, ...rest].filter(Boolean).slice(0, 3),
  };
}

/** "14 photos · 1 video" */
export function formatAlbumCount({ photoCount, videoCount }) {
  const parts = [];
  if (photoCount) parts.push(`${photoCount} ${photoCount === 1 ? "photo" : "photos"}`);
  if (videoCount) parts.push(`${videoCount} ${videoCount === 1 ? "video" : "videos"}`);
  return parts.join(" · ");
}

/**
 * Pure transform from raw CMS rows to what the gallery renders, kept
 * separate from the query so it can be checked without a Wix connection.
 */
export function toGalleryAlbums(rows) {
  const usedSlugs = new Set();
  return rows
    // "Hide" rather than "show": a Wix checkbox nobody has touched is
    // blank, so new albums are visible by default and only a deliberate
    // tick hides one.
    .filter((row) => row.hideFromWebsite !== true && row.title?.trim())
    .sort((a, b) => {
      // Newest first by default. A Sort order number is a manual
      // override: numbered albums are pinned above the rest, lowest first.
      const aHas = typeof a.sortOrder === "number";
      const bHas = typeof b.sortOrder === "number";
      if (aHas && bHas) return a.sortOrder - b.sortOrder;
      if (aHas !== bHas) return aHas ? -1 : 1;
      return new Date(b._createdDate) - new Date(a._createdDate);
    })
    .map((row) => {
      const title = row.title.trim();
      const album = { id: row._id, title };
      const items = (Array.isArray(row.media) ? row.media : [])
        .map((raw, i) => toMediaItem(raw, album, i))
        .filter(Boolean);
      return { ...album, items, createdDate: row._createdDate ?? null };
    })
    .filter((album) => album.items.length > 0)
    .map((album) => {
      // Two albums with the same title get "-2", "-3"... in display order.
      const base = slugify(album.title);
      let slug = base;
      for (let n = 2; usedSlugs.has(slug); n++) slug = `${base}-${n}`;
      usedSlugs.add(slug);
      const videoCount = album.items.filter((i) => i.type === "video").length;
      return {
        ...album,
        slug,
        cover: coverOf(album.items),
        photoCount: album.items.length - videoCount,
        videoCount,
      };
    });
}
