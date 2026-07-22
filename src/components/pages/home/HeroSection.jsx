"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import RibbonButton from "@/components/utils/Ribbonbutton";
import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import PaperDivider from "@/components/utils/PaperDivider";
import Container from "@/components/utils/Container";
import { openTableReservationLink } from "@/data/external-links";

import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";

/**
 * HeroSection
 * ---------------------------------------------------------------
 * Background scales up, blurs, and fades as the hero scrolls out
 * of view — same idea as motion.dev's "Scroll Zoom Hero" example,
 * adapted to NOT require pinning the section with position:sticky
 * inside an artificially tall (200vh) wrapper. Instead, scroll
 * progress is tracked across the hero's own natural height (from
 * the moment it starts leaving the top of the viewport, to the
 * moment it's fully scrolled past) — so this adds zero extra page
 * height and doesn't fight with the Navbar's normal document flow
 * above it.
 *
 * Trade-off vs. the official pinned version: that one keeps the
 * hero visually locked in place for a full extra screen-height of
 * scrolling while the effect plays out, which reads as more
 * dramatic/cinematic — but costs a full viewport of extra page
 * length. This version's effect plays out over the hero's existing
 * size instead, so it's subtler. Happy to build the pinned variant
 * too if you want that more dramatic version specifically.
 * ---------------------------------------------------------------
 */
function HeroSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} className="relative flex flex-1 overflow-hidden">
      {/* Background layer — the part that scales/blurs/fades on scroll.
          Wrapped in overflow-hidden on the section above so the 1.2x
          scaled image never visibly spills past the section's edges. */}
      <motion.div
        className="absolute inset-0 z-0"
        style={
          prefersReducedMotion
            ? undefined
            : { scale, filter, opacity: bgOpacity }
        }
      >
        <Image
          src="/images/assets/home-hero-bg.png"
          alt="Concrete background image"
          fill
          sizes="100vw"
          priority
          aria-hidden="true"
          className="object-cover object-top"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-r from-transparent via-background/90 lg:via-background/40 to-transparent" />

      {/* Content layer — stays crisp and static; only the background
          behind it animates */}
      <Container className="z-10 flex-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex-1"
        >
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div>
              <motion.p
                variants={v(headerVariants)}
                className="font-semibold font-body text-sm lg:text-base tracking-widest text-accent uppercase text-center lg:text-start"
              >
                Sports Bar <span className="text-foreground">•</span> Play{" "}
                <span className="text-foreground">•</span> Entertainment
              </motion.p>

              <motion.div variants={v(headerVariants)}>
                <Heading className="flex flex-col items-center lg:items-start">
                  <span className="">THERE IS NO</span>
                  <span className="">PLACE LIKE</span>
                  <span className="bg-linear-to-b from-lime via-olive to-deep-cyan bg-clip-text text-transparent w-fit">
                    HOME.
                  </span>
                </Heading>
              </motion.div>
            </div>

            <motion.div variants={v(headerVariants)}>
              <Title className="w-[80%] md:w-[30%] text-center lg:text-start text-lg lg:text-xl font-display font-semibold">
                HOME Sports Bar and Entertainment is a premier venue in the
                northwest suburbs for sports and entertainment.
              </Title>
            </motion.div>

            <motion.div variants={v(buttonVariants)}>
              <RibbonButton href={openTableReservationLink} target="_blank">
                Reserve A Table
              </RibbonButton>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <PaperDivider />
    </section>
  );
}

export default HeroSection;
