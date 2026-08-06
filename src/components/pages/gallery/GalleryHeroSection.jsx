"use client";

import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import ShieldNotch from "@/components/utils/ShieldNotch";

import { motion } from "framer-motion";
import { groupVariants, headerVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

export default function GalleryHeroSection({ photoCount }) {
  const v = useSafeVariants();

  return (
    // Shield notch — pairs with shield-notch-join on GalleryGridSection.
    <section className="shield-notch-bottom relative z-10 bg-background">
      <Image
        src="/images/assets/pool-and-tables-area.png"
        alt=""
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover object-center"
      />
      <div className="absolute inset-0 z-0 bg-background/75 lg:hidden" />
      <div className="absolute inset-0 z-0 hidden bg-linear-to-r from-background from-15% via-background/80 via-55% to-transparent lg:block" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background/70 via-transparent to-background/90" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex max-w-2xl flex-col items-center gap-3 text-center lg:items-start lg:text-start"
        >
          <motion.div variants={v(headerVariants)}>
            <Heading className="drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              Gallery
            </Heading>
            <DividerFlourish className="mx-auto w-24 lg:mx-0" />
          </motion.div>

          <motion.div
            variants={v(headerVariants)}
            className="text-olive drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            <Subheading>
              Every Game. Every Night.
              <br />
              Every Corner Of Home.
            </Subheading>
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Title className="text-foreground-muted drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
              {photoCount} photographs from around the venue — the floor, the
              food, the drinks, and the nights worth showing up for.
            </Title>
          </motion.div>
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}
