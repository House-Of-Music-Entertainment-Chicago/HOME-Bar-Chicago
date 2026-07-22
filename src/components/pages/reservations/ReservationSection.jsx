"use client";

import Image from "next/image";
import { CalendarClock, Users, BadgeCheck } from "lucide-react";
import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RoughBorderFrame from "@/components/utils/RoughBorderFrame";
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
    <section className="relative bg-background">
      <Container className="relative">
        {/* Left — copy, perks, OpenTable widget */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-5">
            <motion.div variants={v(headerVariants)}>
              <Heading>Table Reservations</Heading>
              <DividerFlourish className="mx-0 mt-2 w-20" />
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Text className="text-foreground-muted">
                Reserve your table directly through OpenTable. It&rsquo;s fast,
                easy, and confirmed instantly.
              </Text>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {PERKS.map(({ Icon, title, description }) => (
                <motion.div
                  variants={v(itemVariants)}
                  key={title}
                  className="flex flex-col gap-1"
                >
                  <Icon className="h-12 w-12 text-accent filter-[drop-shadow(0_0_4px_var(--color-accent))_drop-shadow(0_0_8px_var(--color-accent))]" />
                  <Title className="uppercase">{title}</Title>
                  <Text className="text-foreground-muted">{description}</Text>
                </motion.div>
              ))}
            </div>

            <motion.div variants={v(buttonVariants)}>
              <OpenTableWidget />
            </motion.div>
          </div>

          {/* Right — reserved table photo, rough-bordered */}
          <motion.div
            variants={v(itemVariants)}
            className="relative aspect-4/3 w-full"
          >
            <Image
              src="/images/assets/entertainment/reservation-table-image.jpg"
              alt="A reserved table at Home Bar Chicago's entertainment place"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />

            <RoughBorderFrame />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
