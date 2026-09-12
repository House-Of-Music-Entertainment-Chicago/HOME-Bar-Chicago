"use client";

import Image from "next/image";
import { MapPin, Compass, Smartphone } from "lucide-react";
import Container from "@/components/utils/Container";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import RoughBorderFrame from "@/components/utils/RoughBorderFrame";
import VirtualTourEmbed from "@/components/utils/VirtualTourEmbed";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";
import tourPoster from "../../../../public/images/assets/bar-counter.png";

import { motion } from "framer-motion";
import {
  headerVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

// TODO: this belongs in @/data/external-links.js alongside
// openTableReservationLink once that file is editable — it's a static
// external URL, same category as the OpenTable link.
// The trailing `47939175p&61.09h&75.73t` is TourMkr's opening viewpoint:
// panorama id, heading, tilt. Changing it changes where the visitor is
// standing (and which way they're facing) when the tour opens.
const VIRTUAL_TOUR_URL =
  "https://tourmkr.com/F1tzBmOo7X/47939175p&61.09h&75.73t";

const TOUR_NOTES = [
  {
    Icon: Compass,
    label: "Drag to look around — 360° in every direction",
  },
  {
    Icon: MapPin,
    label: "Walk the bar, the pool room and the game floor",
  },
  {
    Icon: Smartphone,
    label: "Works on mobile — one finger to pan",
  },
];

export default function VirtualTourSection() {
  const v = useSafeVariants();

  return (
    <section className="relative overflow-hidden border-y-2 border-black/60 bg-background-alt">
      {/* Concrete texture, knocked well back — this section's job is to
          frame the tour, so the backdrop stays quieter than the one in
          CTASection below it. */}
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority={false}
        aria-hidden="true"
        className="object-cover opacity-15 grayscale"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={v(headerVariants)}
            className="flex flex-col items-center"
          >
            <Subheading className="text-center leading-none">
              Take a Look Around
            </Subheading>
            <DividerFlourish />
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Title className="mt-4 max-w-xl text-center text-foreground-muted">
              Can&apos;t make it in yet? Walk the whole place from right here —
              the bar, the screens, the pool tables and the stage, exactly as
              you&apos;ll find them.
            </Title>
          </motion.div>

          {/* aspect-4/3 on phones, 16/9 from sm up: a 16/9 tour on a
              narrow screen collapses to a letterbox slot too short to
              actually look around in. */}
          <motion.div
            variants={v(itemVariants)}
            className="relative mt-10 aspect-4/3 w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:aspect-video"
          >
            <VirtualTourEmbed
              src={VIRTUAL_TOUR_URL}
              title="360° virtual tour of HOME Sports Bar in Arlington Heights"
              poster={tourPoster}
              prompt="Step Inside HOME"
              hint="Click and drag to look around"
            />
            {/* Sits above the embed's own z-20 controls layer, but it's
                pointer-events-none so it never intercepts a drag. */}
            <RoughBorderFrame className="z-30" />
          </motion.div>

          <motion.ul
            variants={v(itemVariants)}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
          >
            {TOUR_NOTES.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <Text className="text-foreground-muted">{label}</Text>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
