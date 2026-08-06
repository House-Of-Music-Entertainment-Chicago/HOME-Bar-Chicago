"use client";

import { useRef } from "react";
import Image from "next/image";
import Subheading from "@/components/utils/SubHeadingText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";
import { GALLERY_IMAGES } from "@/data/gallery-images";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { headerVariants, buttonVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/* The About hero already renders this photograph full-bleed. Excluding it
   here means the page doesn't fetch a second optimized copy of the same
   asset at a different width — and, because the preview sits below the
   fold, it also stops a lazy duplicate of the hero image from being
   picked up as a late LCP candidate when the visitor scrolls. */
const ABOUT_HERO_SRC = "/images/assets/pool-and-tables-area.png";
const PREVIEW_POOL = GALLERY_IMAGES.filter((p) => p.src !== ABOUT_HERO_SRC);

/* Two rows drawn from alternating indices of the shared gallery data, so
   each row mixes venue / play / food / drinks rather than showing one
   category per row — and so new photos appear here automatically. */
const ROW_A = PREVIEW_POOL.filter((_, i) => i % 2 === 0).slice(0, 10);
const ROW_B = PREVIEW_POOL.filter((_, i) => i % 2 === 1).slice(0, 10);

function PreviewRow({ photos, x, reverse }) {
  return (
    <motion.div
      style={{ x }}
      className={`flex w-max gap-3 sm:gap-4 ${reverse ? "flex-row-reverse" : ""}`}
    >
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative h-36 w-52 shrink-0 overflow-hidden rounded-sm sm:h-44 sm:w-64 lg:h-52 lg:w-76"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 19rem, (min-width: 640px) 16rem, 13rem"
            className="object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function GallerySection() {
  const v = useSafeVariants();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  /* Scrub the two rows past each other as the section crosses the
     viewport. The offset runs from "section enters" to "section leaves"
     so the movement is tied to reading position rather than firing once. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const xA = useTransform(scrollYProgress, [0, 1], ["2%", "-12%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-12%", "2%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-background py-15 px-5"
    >
      {/* <Container> */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={v(headerVariants)}
        className="mb-10 flex flex-col items-center text-center"
      >
        <Subheading>Gallery Preview</Subheading>
        <DividerFlourish className="mt-2 w-24" />
        <Text className="mt-4 max-w-xl text-foreground-muted">
          A look around the room — the floor, the games, the plates and the
          pours.
        </Text>
      </motion.div>
      {/* </Container> */}

      {/* Full-bleed so the rows can run past the container edges; the
          section clips horizontally (clip, not hidden, so nothing below
          gets a scrollbar). Edge mask fades them into the background
          instead of ending on a hard cut. */}
      <div className="marquee-viewport flex w-screen ml-[calc(50%-50vw)] flex-col gap-3 sm:gap-4">
        <PreviewRow photos={ROW_A} x={prefersReducedMotion ? undefined : xA} />
        <PreviewRow
          photos={ROW_B}
          x={prefersReducedMotion ? undefined : xB}
          reverse
        />
      </div>

      {/* <Container> */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={v(buttonVariants)}
        className="mt-12 flex justify-center"
      >
        <RibbonButton href="/gallery" target="_self">
          View Our Gallery
        </RibbonButton>
      </motion.div>
      {/* </Container> */}
    </section>
  );
}
