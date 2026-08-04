"use client";

import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import Container from "@/components/utils/Container";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import DividerFlourish from "@/components/utils/DividerFlourish";
import RibbonButton from "@/components/utils/Ribbonbutton";
import { openTableReservationLink } from "@/data/external-links";
import Image from "next/image";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

function buildFeaturedSlots(events, count = 4) {
  return Array.from({ length: count }, (_, i) => events[i] || null);
}

export default function FeaturedEventsSection({ events = [] }) {
  const v = useSafeVariants();
  const slots = buildFeaturedSlots(events);

  return (
    <section className="relative bg-background">
      <Image
        src="/images/assets/events-featuredevents-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="relative"
        >
          <motion.div variants={v(headerVariants)}>
            <Subheading className="text-center">Featured Events</Subheading>
            <DividerFlourish className="mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {slots.map((event, i) => (
              <motion.div
                variants={v(itemVariants)}
                key={event?.id ?? `empty-${i}`}
                className="flex flex-col border border-olive/40 bg-background-alt/40"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  {event?.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      label={event ? "Event photo" : "No event"}
                      className="h-full w-full"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <Title className="uppercase">
                    {event ? event.title : "No Event"}
                  </Title>
                  {event ? (
                    <>
                      {event.when && (
                        <Text className="uppercase text-lime">
                          {event.when}
                        </Text>
                      )}
                      <Text className="flex-1 text-foreground-muted">
                        {event.description}
                      </Text>
                      {/* <motion.div variants={v(buttonVariants)}>
                        <RibbonButton
                          href={openTableReservationLink}
                          target="_blank"
                        >
                          Reserve Now
                        </RibbonButton>
                      </motion.div> */}
                    </>
                  ) : (
                    <Text className="flex-1 text-foreground-muted">
                      Check back soon for upcoming events.
                    </Text>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
