import { media } from "@wix/sdk";
import { resolveImage } from "./wixResolveImage";

/**
 * Turns raw GalleryAlbums rows from the Wix CMS into what the gallery
 * renders. Pure (no Wix connection), so it can be checked against sample
 * data without credentials. getGalleryAlbums.js does the actual query.
 */

// Wix transcodes every uploaded video into several sizes. 720p is plenty
// for the lightbox and a fraction of a phone original's size. A video
// uploaded below 720p has no 720p copy, so the player falls back through
// the smaller sizes and finally to the original file.
const VIDEO_RESOLUTIONS = ["720p", "480p", "360p"];

function toMediaItem(raw, album, index) {
  if (!raw?.src) return null;

  const caption =
    raw.title?.trim() || raw.description?.trim() || album.title;
  const id = `${album.id}-${index}`;
  const isVideo = raw.type === "video" || raw.src.startsWith("wix:video://");

  if (isVideo) {
    const original = media.getVideoUrl(raw.src);
    return {
      id,
      type: "video",
      // The first source doubles as the item's identity in the grid.
      src: media.getVideoUrl(raw.src, VIDEO_RESOLUTIONS[0]).url,
      sources: [
        ...VIDEO_RESOLUTIONS.map((r) => media.getVideoUrl(raw.src, r).url),
        original.url,
      ],
      poster: resolveImage(raw.thumbnail || original.thumbnail),
      alt: caption,
      category: album.id,
    };
  }

  const src = resolveImage(raw.src);
  if (!src) return null;
  return { id, type: "image", src, alt: caption, category: album.id };
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
