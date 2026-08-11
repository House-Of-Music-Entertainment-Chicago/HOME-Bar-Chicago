"use client";

import Image from "next/image";
import Title from "@/components/utils/TitleText";
import Subheading from "@/components/utils/SubHeadingText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import {
  TrophyIcon,
  MusicNoteIcon,
  BurgerIcon,
  CommunityIcon,
} from "@/data/features-icons";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const DIFFERENTIATORS = [
  {
    Icon: TrophyIcon,
    title: "Sports",
    description:
      "Watch UFC, boxing, NBA, football, and all major sporting events on multiple HD screens.",
  },
  {
    Icon: MusicNoteIcon,
    title: "Entertainment",
    description: "Live bands, DJs, karaoke, and themed events every week.",
  },
  {
    Icon: BurgerIcon,
    title: "Food & Drinks",
    description:
      "Signature dishes, ice-cold beer, premium cocktails, and bar favorites.",
  },
  {
    Icon: CommunityIcon,
    title: "Community",
    description:
      "A welcoming place for friends, families, celebrations, and unforgettable nights.",
  },
];

export default function WhatMakesDifferentSection() {
  const v = useSafeVariants();

  return (
    <section className="relative bg-background">
      <Image
        src="/images/assets/about-whatmakeshome-bg.png"
        alt="Dark black and white background image with two photos on left and right"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />

      <Container className="flex justify-center items-center">
        {/* Center — heading + icon grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="z-1 flex flex-col items-center gap-8 text-center"
        >
          <motion.div variants={v(headerVariants)}>
            <Subheading>What Makes Home Different</Subheading>
            <DividerFlourish className="mt-2 w-24" />
          </motion.div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {DIFFERENTIATORS.map(({ Icon, title, description }) => (
              <motion.div
                variants={v(itemVariants)}
                key={title}
                className="flex flex-col items-center gap-2"
              >
                <Icon className="h-24 w-24 text-accent filter-[drop-shadow(0_0_4px_var(--color-accent))_drop-shadow(0_0_10px_var(--color-accent))]" />
                <Title>{title}</Title>
                <Text className="text-foreground-muted">{description}</Text>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
