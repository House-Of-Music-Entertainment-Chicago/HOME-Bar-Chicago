"use client";

import Subheading from "@/components/utils/SubHeadingText";
import PaperDivider from "@/components/utils/PaperDivider";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";

const GALLERY_COUNT = 6;

export default function EventGallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="py-5 relative bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={v(groupVariants)}
        className="relative"
      >
        <motion.div variants={v(headerVariants)}>
          <Subheading className="text-center">Event Gallery</Subheading>
        </motion.div>

        <div className="flex gap-1 overflow-x-auto px-6 sm:grid sm:grid-cols-6 sm:gap-2 sm:overflow-visible sm:px-0">
          {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
            <motion.div
              variants={v(itemVariants)}
              key={i}
              className="aspect-square w-40 shrink-0 sm:w-full"
            >
              <ImagePlaceholder
                label="Gallery photo"
                className="h-full w-full"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <PaperDivider position="bottom" />
    </section>
  );
}
