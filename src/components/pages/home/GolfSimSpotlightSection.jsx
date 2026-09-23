"use client";

import Image from "next/image";
import Container from "@/components/utils/Container";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import PennantTag from "@/components/utils/PennantTag";
import RibbonButton from "@/components/utils/Ribbonbutton";
import RoughBorderFrame from "@/components/utils/RoughBorderFrame";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
import golfSims from "../../../../public/images/assets/entertainment/about-placestoenjoy-golfsims.png";

import { motion } from "framer-motion";
import {
  headerVariants,
  buttonVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

// TODO: move to the shared external-links file (next to
// openTableReservationLink) once it's editable — duplicated in
// PlacesToPlaySection.jsx until then, so update both if the URL changes.
const GOLF_SIM_BOOKING_URL =
  "https://clients.uschedule.com/wjsportshomebar/booking";

/**
 * GolfSimSpotlightSection
 * ---------------------------------------------------------------
 * The golf sims are the venue's standout activity, so they get their
 * own section right under the hero, the first thing on the page once
 * you start scrolling. The hero's single CTA stays reserved for booking
 * the bar itself; this is where golf gets its own booking button.
 *
 * shield-notch-join: this section is what slides up under the hero's
 * chevron and fills the two triangles its clip cuts away (see
 * ShieldNotch.jsx). Whatever section sits directly after the hero has
 * to carry it.
 * ---------------------------------------------------------------
 */
export default function GolfSimSpotlightSection() {
  const v = useSafeVariants();

  return (
    <section className="shield-notch-join relative border-b-2 border-black/60 bg-background">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Photo — clickable, because people click photos */}
          <motion.div
            variants={v(itemVariants)}
            className="relative aspect-4/3 w-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <Image
              src={golfSims}
              alt="Golf simulator bays at HOME Sports Bar"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <RoughBorderFrame />

            <span className="absolute left-3 top-4 z-10 -rotate-3 bg-accent px-3 py-1 font-heading text-lg uppercase tracking-wide text-accent-foreground shadow-[3px_3px_0_rgba(0,0,0,0.9)] lg:text-xl">
              Book Online
            </span>

            {/* Hidden from the tab order and screen readers: the button
                below is the accessible version of this same link. */}
            <a
              href={GOLF_SIM_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 z-20"
            />
          </motion.div>

          {/* Copy + CTA */}
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <motion.div variants={v(headerVariants)}>
              <PennantTag ribbonImage={ribbonLime}>Golf Sims</PennantTag>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Subheading className="leading-none">Tee Off at HOME</Subheading>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Title className="max-w-md text-foreground-muted">
                Play the world&apos;s best courses on our high-tech golf
                simulators. Grab your crew, pick a course and take your
                swing, with the bar just steps away.
              </Title>
            </motion.div>

            <motion.div variants={v(buttonVariants)} className="mt-2">
              <RibbonButton
                href={GOLF_SIM_BOOKING_URL}
                target="_blank"
                className="text-background"
              >
                Book a Golf Sim
              </RibbonButton>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
