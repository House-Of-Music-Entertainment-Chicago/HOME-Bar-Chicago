"use client";

import Image from "next/image";
import { CalendarClock, Users, BadgeCheck } from "lucide-react";
import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import ShieldNotch from "@/components/utils/ShieldNotch";
import OpenTableWidget from "./sub-components/OpenTableWidget";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const PERKS = [
  {
    Icon: CalendarClock,
    title: "Instant Confirmation",
    description: "Book your table in seconds.",
  },
  {
    Icon: Users,
    title: "Parties of Any Size",
    description: "From intimate dinners to game night with the crew.",
  },
  {
    Icon: BadgeCheck,
    title: "Free & Easy",
    description: "No booking fees. Ever.",
  },
];

export default function TableReservationSection() {
  const v = useSafeVariants();

  return (
    // Shield notch — pairs with shield-notch-join on PrivateEventSection.
    <section className="shield-notch-bottom relative z-10 flex min-h-[60vh] flex-col justify-center bg-background">
      {/* The lounge photo is the backdrop now rather than a framed card
          beside the copy — same pattern as the home and about heroes. */}
      <Image
        src="/images/assets/entertainment/reservation-table-image.jpg"
        alt="Lounge seating and pool tables at HOME Sports Bar, ready for guests"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-center"
      />

      {/* Readability scrims — even veil below lg where the copy is full
          width, weighted left at lg+ where it sits in a column. */}
      <div className="absolute inset-0 z-0 bg-background/80 lg:hidden" />
      <div className="absolute inset-0 z-0 hidden bg-linear-to-r from-background from-15% via-background/85 via-55% to-transparent lg:block" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background/70 via-transparent to-background/90" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex max-w-2xl flex-col gap-5 mx-auto lg:mx-0"
        >
          <motion.div variants={v(headerVariants)}>
            <Heading className="drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              Table Reservations
            </Heading>
            <DividerFlourish className="mx-0 mt-2 w-20" />
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Text className="text-foreground-muted drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
              Reserve your table directly through OpenTable. It&rsquo;s fast,
              easy, and confirmed instantly.
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PERKS.map(({ Icon, title, description }) => (
              <motion.div
                variants={v(itemVariants)}
                key={title}
                className="flex flex-col gap-1"
              >
                <Icon className="h-12 w-12 text-accent filter-[drop-shadow(0_0_4px_var(--color-accent))_drop-shadow(0_0_8px_var(--color-accent))]" />
                <Title className="uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  {title}
                </Title>
                <Text className="text-foreground-muted drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                  {description}
                </Text>
              </motion.div>
            ))}
          </div>

          <motion.div variants={v(buttonVariants)}>
            <OpenTableWidget />
          </motion.div>
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}
