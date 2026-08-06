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
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

export default function CTASection() {
  const v = useSafeVariants();

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
          className="relative z-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
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
            <RibbonButton
              href={openTableReservationLink}
              target="_blank"
              className="text-background"
            >
              Reserve a Table
            </RibbonButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
