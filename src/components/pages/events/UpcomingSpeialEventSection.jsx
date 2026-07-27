"use client";

import Image from "next/image";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import PennantTag from "@/components/utils/PennantTag";
import ribbonOrange from "../../../../public/images/assets/ribbon-orange.png";
import DateBanner from "@/components/utils/DateBanner";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

function buildSpecialEventSlots(events, count = 4) {
  return Array.from({ length: count }, (_, i) => events[i] || null);
}

function getMonthDay(dateStr) {
  if (!dateStr) return { month: "", day: "" };
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return { month: "", day: "" };

  return {
    month: parsed.toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    }),
    day: parsed.toLocaleDateString("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    }),
  };
}

export default function UpcomingSpecialEventsSection({ events = [] }) {
  const v = useSafeVariants();
  const slots = buildSpecialEventSlots(events);

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
            className="mb-3 flex justify-center"
          >
            <PennantTag ribbonImage={ribbonOrange}>
              Upcoming Special Events
            </PennantTag>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {slots.map((event, i) => {
              const { month, day } = getMonthDay(event?.date);

              return (
                <motion.div
                  variants={v(itemVariants)}
                  key={event?.id ?? `empty-${i}`}
                  className="relative aspect-square overflow-hidden border border-olive/40"
                >
                  {event?.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      label={event ? "Event photo" : "No event"}
                      className="h-full w-full"
                    />
                  )}
                  {event && (
                    <DateBanner month={month} day={day} color="orange" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 py-3">
                    <Title className="text-center uppercase">
                      {event ? event.title : "No Event"}
                    </Title>
                  </div>
                </motion.div>
              );
            })}

            {/* Social follow card — always the 5th grid item, not tied to event data */}
            <motion.div
              variants={v(headerVariants)}
              className="flex flex-col items-center justify-center gap-3 border border-olive/40 bg-background-alt/60 p-4 text-center"
            >
              <Text className="uppercase">
                Follow us on social media for more events & announcements!
              </Text>
              <div className="flex gap-3">
                <SiFacebook className="h-8 w-8 text-lime" />
                <SiInstagram className="h-8 w-8 text-lime" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
