"use client";

/**
 * StarRating
 * ---------------------------------------------------------------
 * Simple 5-star rating display (filled stars only — this is for
 * displaying testimonials with a fixed rating, not an interactive
 * input, so no half-star/click logic needed).
 * ---------------------------------------------------------------
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";

export default function StarRating({
  count = 5,
  className = "",
  height = "h-4",
  width = "w-4",
}) {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={v(groupVariants)}
      className={`flex gap-0.5 ${className}`}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i} variants={v(itemVariants)}>
          <svg
            viewBox="0 0 24 24"
            className={`${height} ${width} ${i < count ? "fill-yellow-400" : "fill-white/20"}`}
          >
            <path d="M12 2 L14.9 8.6 L22 9.3 L16.7 14.1 L18.2 21 L12 17.4 L5.8 21 L7.3 14.1 L2 9.3 L9.1 8.6 Z" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
