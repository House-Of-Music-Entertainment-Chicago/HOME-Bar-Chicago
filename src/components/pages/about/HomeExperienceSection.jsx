"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";

const CHECKLIST = [
  "Multiple HD Screens",
  "Premium Sound System",
  "Spacious & Comfortable Seating",
  "Friendly Staff",
  "Weekly Events & Promotions",
  "Unforgettable Atmosphere",
];

export default function HomeExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative bg-background">
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={v(groupVariants)}
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
      >
        {/* Left — heading, copy, checklist */}
        <div className="z-1 flex flex-col gap-4 ml-15 my-5">
          <motion.div variants={v(headerVariants)}>
            <Subheading>The Home Experience</Subheading>
            <DividerFlourish className="mx-0 mt-2 w-20" />
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Title className="text-foreground-muted">
              We believe every visit should feel like game night with your
              closest friends.
            </Title>
          </motion.div>

          <ul className="flex flex-col gap-2">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <motion.div variants={v(headerVariants)}>
                  <Text className="flex items-center gap-2">
                    <Check className="h-8 w-8 shrink-0 text-olive" />
                    {item}
                  </Text>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — bar interior photo */}
        <motion.div
          variants={v(itemVariants)}
          className="relative aspect-video w-full overflow-hidden shadow-lg"
        >
          <Image
            src="/images/assets/about-homeexperience-image.png"
            alt="Home Bar Chicago interior with HD screens"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
