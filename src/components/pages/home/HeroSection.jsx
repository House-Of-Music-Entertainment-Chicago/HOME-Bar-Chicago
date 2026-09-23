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
import Container from "@/components/utils/Container";
import ShieldNotch from "@/components/utils/ShieldNotch";
import { openTableReservationLink } from "@/data/external-links";

import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

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
  const v = useSafeVariants();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    // shield-notch-bottom cuts the chevron from the logo's lower edge into
    // this section, replacing the torn-paper divider that used to sit here.
    // Note it also clips anything overhanging the section, which is why the
    // PaperDivider was removed rather than kept alongside it.
    // z-10 matters: the section below carries .shield-notch-join, which
    // pulls it up into the triangles this clip removes. Without the hero
    // out-ranking it, that section's background would paint over the notch
    // instead of filling in behind it.
    <section
      ref={sectionRef}
      className="shield-notch-bottom relative z-10 flex flex-1"
    >
      {/* Background layer — the part that scales/blurs/fades on scroll.
          The clipping lives on THIS wrapper rather than on the <section>
          so the 1.2x scaled image still can't spill past the hero while
          the section itself stays unclipped for the shield notch above. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={
            prefersReducedMotion
              ? undefined
              : { scale, filter, opacity: bgOpacity }
          }
        >
          <Image
            src="/images/assets/bar-counter.png"
            alt="Guests gathered at the bar counter under neon lighting inside HOME Sports Bar"
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            // object-center, not object-top: the bar counter, the crowd and
            // the neon signage all sit in this photo's middle band, so a
            // centered crop keeps the subject on screen at every aspect
            // ratio. Anchoring to the top would frame the empty ceiling.
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Readability scrims.
          Three stacked layers rather than one, because the copy moves:
          it's centered over the photo below lg and sits in the left
          column at lg+. Each layer owns one job so the photo stays
          genuinely visible while the text always has a dark bed under
          it. These sit OUTSIDE the animated wrapper above, so the
          headline keeps its contrast as the photo fades away on scroll. */}

      {/* 1. Below lg the copy is centered, so no side is safe — even veil. */}
      <div className="absolute inset-0 z-0 bg-background/55 lg:hidden" />

      {/* 2. At lg+ the copy moves left, so weight the darkness there and
             let the room read through on the right. */}
      <div className="absolute inset-0 z-0 hidden bg-linear-to-r from-background from-15% via-background/80 via-15% to-transparent lg:block" />

      {/* 3. Vertical falloff — seats the headline against the top and
             blends the photo into the torn-paper divider at the bottom. */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background/50 via-transparent to-background/70" />

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
                className="font-semibold font-body text-sm lg:text-base tracking-widest text-accent uppercase text-center lg:text-start drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
              >
                Sports Bar <span className="text-foreground">•</span> Play{" "}
                <span className="text-foreground">•</span> Entertainment
              </motion.p>

              <motion.div variants={v(headerVariants)}>
                {/* drop-shadow (not text-shadow) so it also applies to the
                    bg-clip-text span below — the filter acts on the
                    painted glyphs, whereas text-shadow would paint a blob
                    behind transparent text. */}
                <Heading className="flex flex-col items-center lg:items-start drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                  <span className="">THERE IS NO</span>
                  <span className="">PLACE LIKE</span>
                  {/* Weighted stops keep the bulk of the letterform in
                      lime/olive and let deep-cyan land only at the very
                      bottom edge: deep-cyan is ~2:1 against this dark
                      background, so an evenly-spread gradient left the
                      lower half of the word barely legible. */}
                  <span className="bg-linear-to-b from-lime from-40% via-olive via-75% to-deep-cyan bg-clip-text text-transparent w-fit">
                    HOME.
                  </span>
                </Heading>
              </motion.div>
            </div>

            <motion.div variants={v(headerVariants)}>
              <Title className="w-[80%] md:w-[50%] mx-auto lg:mx-0 text-center lg:text-start text-lg lg:text-xl font-display font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
                HOME Sports Bar and Entertainment is a premier venue in the
                northwest suburbs for sports and entertainment.
              </Title>
            </motion.div>

            {/* <motion.div variants={v(buttonVariants)}>
              <RibbonButton
                href={openTableReservationLink}
                target="_blank"
                className="text-background"
              >
                Reserve A Table
              </RibbonButton>
            </motion.div> */}
          </div>
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}

export default HeroSection;
