// lib/getEvents.js (add alongside getThisWeeksEvents)
import { wixClient } from "@/lib/wix";
import { resolveImage } from "./wixResolveImage";

function formatWhen(dateStr, timeStr) {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  const datePart = Number.isNaN(parsed.getTime())
    ? ""
    : parsed.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });

  if (!timeStr) return datePart;

  const [hoursStr, minutesStr = "00"] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);
  if (Number.isNaN(hours)) return datePart;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const timePart = `${displayHour}${minutesStr !== "00" ? ":" + minutesStr.padStart(2, "0") : ""}${period}`;

  return datePart ? `${datePart} • ${timePart}` : timePart;
}

export async function getFeaturedEvents() {
  const result = await wixClient.items
    .query("FeaturedEvents") // swap for the real collectionId once confirmed
    .descending("_createdDate")
    .limit(4)
    .find();

  return result.items.map((item) => ({
    id: item._id,
    title: item.eventName,
    description: item.eventDescription,
    imageUrl: resolveImage(item.eventImage),
    when: formatWhen(item.eventDate, item.eventTime),
  }));
}
