"use client";

import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Container from "@/components/utils/Container";
import DividerFlourish from "@/components/utils/DividerFlourish";
import ShieldNotch from "@/components/utils/ShieldNotch";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

export default function AboutHeroSection() {
  const v = useSafeVariants();

  return (
    // shield-notch-bottom + z-10 + <ShieldNotch/> below, paired with
    // shield-notch-join on OurStorySection — see ShieldNotch.jsx.
    <section className="shield-notch-bottom relative z-10 flex min-h-[60vh] flex-col justify-center">
      {/* Full-bleed room shot, same treatment as the home hero: the
          photograph is the backdrop rather than a framed card, so the
          venue itself sets the tone the moment the page opens. */}
      <Image
        src="/images/assets/pool-and-tables-area.png"
        alt="The main floor at HOME Sports Bar — guests at high-top tables and pool tables under coloured lighting"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-center"
      />

      {/* Readability scrims — mirrors the home hero. The copy is centred
          below lg and moves into the left column at lg+, so the veil is
          even on small screens and weighted left on large ones. */}
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
              About Home
            </Heading>
            <DividerFlourish className="mx-auto w-24 lg:mx-0" />
          </motion.div>

          <motion.div
            variants={v(headerVariants)}
            className="text-olive drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            <Subheading>
              Our Story. Our Passion.
              <br />
              Your Home.
            </Subheading>
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Title className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
              More than just a sports bar&mdash;HOME is where great food,
              unforgettable entertainment, and the biggest sporting moments come
              together.
            </Title>
          </motion.div>

          {/* Previously pinned to the corner of the photo card; with the
              photo now full-bleed it reads better set inline under the copy. */}
          <motion.div variants={v(itemVariants)} className="mt-2 -rotate-1">
            <PennantTag ribbonImage={ribbonLime}>
              Good Nights Start Here.
            </PennantTag>
          </motion.div>
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}
