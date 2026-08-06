"use client";

import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import ShieldNotch from "@/components/utils/ShieldNotch";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";

import { motion } from "framer-motion";
import { groupVariants, headerVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * Shared hero for legal pages. Intentionally quieter than the marketing
 * heroes — a texture rather than a venue photograph, and no CTA — so the
 * page reads as a document while still sitting inside the site's design.
 * Reusable for a Privacy Policy or Accessibility statement later.
 */
export default function LegalHeroSection({ title, lastUpdated }) {
  const v = useSafeVariants();

  return (
    <section className="shield-notch-bottom relative z-10 bg-background">
      <Image
        src={sectionBg1}
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 z-0 bg-background/80" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={v(headerVariants)}>
            <Heading>{title}</Heading>
            <DividerFlourish className="mt-2 w-24" />
          </motion.div>

          {lastUpdated && (
            <motion.div variants={v(headerVariants)}>
              <Text className="mt-4 uppercase tracking-widest text-accent">
                Last updated {lastUpdated}
              </Text>
            </motion.div>
          )}
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}
