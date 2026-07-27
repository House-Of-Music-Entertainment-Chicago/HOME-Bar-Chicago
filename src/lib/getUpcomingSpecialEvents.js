import { wixClient } from "./wix";
import { resolveImage } from "./wixResolveImage";

export async function getUpcomingSpecialEvents() {
  const result = await wixClient.items
    .query("UpcomingSpecialEvents") // confirm the real collectionId via debug route — spaces may not survive as-is
    .descending("_createdDate")
    .limit(4)
    .find();

  return result.items.map((item) => ({
    id: item._id,
    title: item.eventName,
    description: item.eventDescription,
    date: item.eventDate, // used to derive month/day for DateBanner
    time: item.eventTime,
    location: item.eventLocation,
    eventUrl: item.eventUrl || null,
    imageUrl: resolveImage(item.eventImage),
  }));
}
