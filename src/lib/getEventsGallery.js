import { wixClient } from "./wix";
import { resolveImage } from "./wixResolveImage";

// export async function getEventGalleryImages(limit = 6) {
//   const collectionIds = ["Events", "FeaturedEvents", "UpcomingSpecialEvents"]; // confirm real IDs

//   const results = await Promise.all(
//     collectionIds.map((id) =>
//       wixClient.items.query(id).descending("_createdDate").limit(limit).find(),
//     ),
//   );

//   return results
//     .flatMap((result) => result.items)
//     .map((item) => ({
//       id: item._id,
//       imageUrl: resolveImage(item.eventImage),
//       createdDate: item._createdDate,
//     }))
//     .filter((entry) => entry.imageUrl) // skip items with no photo uploaded
//     .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
//     .slice(0, limit);
// }
// lib/getEvents.js

export async function getEventGalleryImages() {
  const sources = [
    { collectionId: "Events", limit: 10 },
    // { collectionId: "FeaturedEvents", limit: 4 },
    // { collectionId: "UpcomingSpecialEvents", limit: 4 },
  ];

  const results = await Promise.all(
    sources.map(({ collectionId, limit }) =>
      wixClient.items
        .query(collectionId)
        .descending("_createdDate")
        .limit(limit)
        .find(),
    ),
  );

  return results
    .flatMap((result) => result.items)
    .map((item) => ({
      id: item._id,
      imageUrl: resolveImage(item.eventImage),
      createdDate: item._createdDate,
    }))
    .filter((entry) => entry.imageUrl)
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
}
