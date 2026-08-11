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

export default function EventsHero() {
  const v = useSafeVariants();

  return (
    // Shield notch — pairs with shield-notch-join on ThisWeekStrip.
    <section className="shield-notch-bottom relative z-10 bg-background">
      {/* Full-bleed room shot, same treatment as the home hero: the
                photograph is the backdrop rather than a framed card, so the
                venue itself sets the tone the moment the page opens. */}
      <Image
        src="/images/assets/games-entertainment-area.png"
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
                At <span className="text-accent">Home</span>
              </Heading>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Subheading className="mt-3 uppercase text-accent">
                Sports • Live Music • UFC • Karaoke
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

      <ShieldNotch />
    </section>
  );
}
