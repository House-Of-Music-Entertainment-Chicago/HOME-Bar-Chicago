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
      {/* Background — grayscale crowd photo behind the left copy */}

      <Image
        src="/images/assets/events-hero-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
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

      <ShieldNotch />
    </section>
  );
}
