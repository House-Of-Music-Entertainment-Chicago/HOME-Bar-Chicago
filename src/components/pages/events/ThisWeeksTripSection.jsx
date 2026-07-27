"use client";

import Image from "next/image";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
import Container from "@/components/utils/Container";
import DateBanner from "@/components/utils/DateBanner";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

function toDateKey(date) {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function formatTime(dateStr, timeStr) {
  if (!timeStr) return null;
  const parsed = new Date(`${dateStr}T${timeStr}`);
  if (Number.isNaN(parsed.getTime())) return timeStr;
  return parsed.toLocaleString("en-US", { timeStyle: "short" });
}

// events is already scoped to this week by getThisWeeksEvents() — this
// just arranges them into 7 fixed day-slots (today → +6 days), filling
// any day with no event with a placeholder card.
function buildWeekSlots(events) {
  const eventsByDay = new Map();
  for (const event of events) {
    if (!event.date) continue;
    const key = toDateKey(new Date(event.date));
    if (!eventsByDay.has(key)) eventsByDay.set(key, event);
  }

  // Anchor "today" to UTC midnight, not local midnight
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  return Array.from({ length: 7 }, (_, i) => {
    const slotDate = new Date(todayUTC);
    slotDate.setUTCDate(todayUTC.getUTCDate() + i);

    return {
      day: slotDate.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      month: slotDate.toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      }),
      date: slotDate.toLocaleDateString("en-US", {
        day: "2-digit",
        timeZone: "UTC",
      }),
      event: eventsByDay.get(toDateKey(slotDate)) || null,
    };
  });
}

export default function ThisWeekStrip({ events = [] }) {
  const v = useSafeVariants();
  const weekSlots = buildWeekSlots(events);

  return (
    <section className="bg-background">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div
            variants={v(headerVariants)}
            className="flex justify-center"
          >
            <PennantTag ribbonImage={ribbonLime}>This Week At HOME</PennantTag>
          </motion.div>

          <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {weekSlots.map((slot, i) => {
              const { day, month, date, event } = slot;

              const card = (
                <motion.div
                  variants={v(itemVariants)}
                  className="relative flex h-full flex-col border border-olive/40"
                >
                  <Text className="bg-background-alt text-center uppercase text-foreground-muted">
                    {day}
                  </Text>
                  <div className="relative aspect-square w-full overflow-hidden">
                    {event?.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                        priority // only true for the very first rendered card
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlaceholder
                        label={event ? "Event photo" : "No event"}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <DateBanner month={month} day={date} color="olive" />
                  <div
                    className="px-2 py-2 text-center"
                    title={event?.description || undefined}
                  >
                    <Title className="uppercase">
                      {event ? event.title : "No Event"}
                    </Title>
                    {event ? (
                      <>
                        {event.time && (
                          <Text className="mt-0.5 text-foreground-muted">
                            {formatTime(event.date, event.time)}
                          </Text>
                        )}
                        {event.location && (
                          <Text className="mt-0.5 text-foreground-muted">
                            {event.location}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text className="mt-0.5 text-foreground-muted">
                        Check back soon
                      </Text>
                    )}
                  </div>
                </motion.div>
              );

              return event?.eventUrl ? (
                <a
                  key={i}
                  href={event.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contents"
                >
                  {card}
                </a>
              ) : (
                <div key={i} className="contents">
                  {card}
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
