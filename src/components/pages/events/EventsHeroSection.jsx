"use client";

import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";

export default function EventsHero() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative bg-background">
      {/* Background — grayscale crowd photo behind the left copy */}

      <Image
        src="/images/assets/events-hero-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-background/0" />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex flex-col gap-4"
        >
          <div>
            <motion.div variants={v(headerVariants)}>
              <Heading>
                This Week
                <br />
                At <span className="text-lime">Home</span>
              </Heading>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Subheading className="mt-3 uppercase text-foreground-muted">
                Sports • Live Music • UFC • Trivia • Karaoke
              </Subheading>
              <DividerFlourish className="mx-0 mt-3 w-20" />
            </motion.div>
          </div>

          <motion.div variants={v(headerVariants)}>
            <Title className="max-w-md text-foreground-muted">
              Never miss the biggest fights, live performances, and
              unforgettable nights.
            </Title>
          </motion.div>
        </motion.div>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
