"use client";

import Image from "next/image";
import Link from "next/link";
import Subheading from "@/components/utils/SubHeadingText";
import sectionBg1 from "../../../../public//images/assets/section-bg-1.jpg"; // TODO: swap for your real photo
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";
import { openTableReservationLink } from "@/data/external-links";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  itemVariants,
  groupVariants,
} from "@/data/animation-variants";

/**
 * ReserveTableSection
 * ---------------------------------------------------------------
 * The "GOOD NIGHTS START HERE." bar. Background is a real photo
 * (concrete/crowd texture) put through a duotone treatment:
 *
 *   1. `grayscale` filter strips the photo's own color, leaving
 *      just its luminance (light/dark texture, shapes, silhouettes).
 *   2. An olive-colored layer sits on top with
 *      `mix-blend-mode: multiply` — this recolors based on the
 *      photo's actual light/dark values instead of just sitting
 *      over it like a flat tinted pane of glass. Dark parts of the
 *      photo stay dark, light parts pick up the olive tone.
 *   3. A subtle dark gradient at the edges on top of THAT, purely
 *      for text legibility where the headline/button sit.
 *
 * If `multiply` ends up too dark/muddy once you see the real
 * photo, try swapping to `mix-blend-mode: color` instead — it
 * preserves the photo's original lightness more faithfully.
 *
 * Motion: same EASE curve and stagger timing as FeaturesSection.jsx
 * and FeaturedMenuSection.jsx — subheading, paragraph, and button
 * stagger in together as one group, once, on scroll into view.
 * ---------------------------------------------------------------
 */

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative overflow-hidden border-y-2 border-black/60">
      {/* Layer 1 — the photo, desaturated */}
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="object-cover grayscale contrast-125 brightness-200"
      />

      {/* Layer 2 — olive duotone tint, blended against the photo's
          luminance rather than flattening it */}
      <div
        className="absolute inset-0 bg-lime"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Layer 3 — light darkening at the edges so text stays legible
          regardless of what's directly behind it */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />

      <Container>
        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div variants={v(itemVariants)}>
            <Subheading className="leading-none tracking-wide w-[33%] text-nowrap">
              Good Nights
              <br />
              Start Here.
            </Subheading>
          </motion.div>

          <motion.p
            variants={v(itemVariants)}
            className="max-w-xs text-2xl lg:text-4xl text-foreground font-body sm:w-[33%]"
          >
            Reserve your table and let the good times roll.
          </motion.p>

          <motion.div variants={v(itemVariants)}>
            <RibbonButton href={openTableReservationLink} target="_blank">
              Reserve a Table
            </RibbonButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
