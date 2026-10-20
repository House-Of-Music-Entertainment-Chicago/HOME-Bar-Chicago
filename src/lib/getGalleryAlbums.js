import { wixClient } from "./wix";
import { toGalleryAlbums } from "./galleryAlbums";

/**
 * The client manages the gallery in the Wix dashboard, in a CMS collection
 * with one row per album:
 *
 *   GalleryAlbums
 *     title          Text           album name, shown as a filter tab
 *     media          Media Gallery  the album's photos and videos; each
 *                                   item's Title is its caption
 *     hideFromWebsite Boolean       ticking hides the whole album
 *     sortOrder      Number         optional; lower numbers come first
 *
 * Changes reach the site through the /api/revalidate webhook (target
 * "gallery"), which refreshes /gallery and /about.
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
