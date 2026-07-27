import { wixClient } from "@/lib/wix";
import { media } from "@wix/sdk";

export async function getThisWeekEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const result = await wixClient.items
    .query("Events")
    .ge("eventDate", today.toISOString())
    .le("eventDate", weekEnd.toISOString())
    .ascending("eventDate")
    .find();

  return result.items.map((item) => {
    const rawImage = item.eventImage;

    let imageUrl = null;
    if (rawImage) {
      try {
        imageUrl = media.getImageUrl(rawImage).url;
      } catch (error) {
        console.error("Failed to resolve Wix image URL:", rawImage, error);
      }
    }

    return {
      id: item._id,
      title: item.eventName,
      description: item.eventDescription,
      imageUrl,
      date: item.eventDate,
      time: item.eventTime,
      location: item.eventLocation,
      eventUrl: item.eventUrl || null,
    };
  });
}
