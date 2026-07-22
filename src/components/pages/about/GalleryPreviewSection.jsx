"use client";

import Image from "next/image";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";

const GALLERY_PHOTOS = [
  "/images/assets/entertainment/gallery-image1.jpg", // TODO: crowd photo
  "/images/assets/entertainment/gallery-image2.jpg", // TODO: wings/food photo
  "/images/assets/entertainment/gallery-image3.jpg", // TODO: bottles photo
  "/images/assets/entertainment/gallery-image4.jpg", // TODO: crowd/DJ photo
  "/images/assets/entertainment/gallery-image5.jpg", // TODO: burger photo
  "/images/assets/entertainment/gallery-image6.jpg", // TODO: toast/cheers photo
];

export default function GallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative bg-background px-6 py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div
            variants={v(headerVariants)}
            className="mb-10 flex flex-col items-center text-center"
          >
            <Subheading>Gallery Preview</Subheading>
            <DividerFlourish className="mt-2 w-24" />
          </motion.div>

          <div className="mb-10 grid grid-cols-3 sm:grid-cols-6">
            {GALLERY_PHOTOS.map((photo, i) => (
              <motion.div
                variants={v(itemVariants)}
                key={i}
                className="relative aspect-square w-full overflow-hidden rounded-sm"
              >
                {photo ? (
                  <Image
                    src={photo}
                    alt="HOME Bar gallery image"
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface text-[10px] text-foreground-muted">
                    TODO
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={v(buttonVariants)}
            className="flex justify-center"
          >
            <RibbonButton href="/events">View Upcoming Events</RibbonButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
