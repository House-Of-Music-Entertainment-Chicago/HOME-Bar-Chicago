"use client";

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

const SPECIAL_EVENTS = [
  { month: "Oct", day: "31", title: "Halloween Party" },
  { month: "Sep", day: "20", title: "Oktoberfest Celebration" },
  { month: "Feb", day: "09", title: "Super Bowl Watch Party" },
  { month: "Dec", day: "31", title: "New Year's Eve Countdown" },
];

export default function UpcomingSpecialEventsSection() {
  const v = useSafeVariants();

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
            {SPECIAL_EVENTS.map((event) => (
              <motion.div
                variants={v(itemVariants)}
                key={event.title}
                className="relative aspect-square overflow-hidden border border-olive/40"
              >
                <ImagePlaceholder
                  label="Event photo"
                  className="h-full w-full"
                />
                <DateBanner
                  month={event.month}
                  day={event.day}
                  color="orange"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 py-3">
                  <Title className="text-center uppercase">{event.title}</Title>
                </div>
              </motion.div>
            ))}

            {/* Social follow card — same grid, not an event photo */}
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
