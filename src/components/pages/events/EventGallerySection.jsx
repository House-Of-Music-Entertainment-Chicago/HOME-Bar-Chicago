"use client";

import Subheading from "@/components/utils/SubHeadingText";
import PaperDivider from "@/components/utils/PaperDivider";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";
import Image from "next/image";

export default function EventGallerySection({ images = [] }) {
  const v = useSafeVariants();

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

        {images.length > 0 ? (
          <div className="flex gap-1 overflow-x-auto px-6 sm:grid sm:grid-cols-5 sm:gap-2 sm:overflow-visible sm:px-0">
            {images.map((image) => (
              <motion.div
                variants={v(itemVariants)}
                key={image.id}
                className="relative aspect-square w-40 shrink-0 overflow-hidden sm:w-full"
              >
                <Image
                  src={image.imageUrl}
                  alt="Event gallery photo"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center px-6">
            <ImagePlaceholder
              label="No Events posted yet"
              className="w-full h-64"
            />
          </div>
        )}
      </motion.div>
      <PaperDivider position="bottom" />
    </section>
  );
}
