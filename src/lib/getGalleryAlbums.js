import { wixClient } from "./wix";
import { toGalleryAlbums } from "./galleryAlbums";

/**
 * The client manages the gallery in the Wix dashboard, in a CMS collection
 * with one row per album:
 *
 *   GalleryAlbums
 *     title           Text           album name; its page is /gallery/<slug>
 *     media           Media Gallery  the album's photos and videos; each
 *                                    item's Title is its caption
 *     hideFromWebsite Boolean        ticking hides the whole album
 *     sortOrder       Number         optional manual override: numbered
 *                                    albums are pinned first, lowest first;
 *                                    the rest show newest first
 *
 * Changes reach the site through the /api/revalidate webhook (target
 * "gallery"), which refreshes /gallery, every /gallery/<slug>, and /about.
 * One query returns every album with its media; 100 albums is far beyond
 * what a single venue's gallery needs.
 */
export const GALLERY_COLLECTION_ID = "GalleryAlbums";

export async function getGalleryAlbums() {
  // Deliberately lets errors throw. During a webhook-triggered rebuild a
  // thrown error makes Next keep serving the previous page, whereas
  // returning an empty list would publish an empty gallery.
  const { items } = await wixClient.items
    .query(GALLERY_COLLECTION_ID)
    .limit(100)
    .find();
  return toGalleryAlbums(items);
}

/**
 * One album by slug, plus its neighbours in display order for the
 * "next album" link at the foot of each album page. null if no such
 * (visible) album exists.
 */
export async function getGalleryAlbum(slug) {
  const albums = await getGalleryAlbums();
  const index = albums.findIndex((a) => a.slug === slug);
  if (index === -1) return null;
  return {
    album: albums[index],
    next: albums.length > 1 ? albums[(index + 1) % albums.length] : null,
  };
}
