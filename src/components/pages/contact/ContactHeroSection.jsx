"use client";

import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";

import { motion } from "framer-motion";
import { groupVariants, headerVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

export default function ContactHero() {
  const v = useSafeVariants();

  return (
    <section className="relative bg-background">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="relative z-10 text-center"
        >
          <motion.div variants={v(headerVariants)}>
            <Heading>
              Get In <span className="text-lime">Touch</span>
            </Heading>
            <DividerFlourish className="mx-auto mt-3 w-20" />
          </motion.div>

          <motion.div variants={v(headerVariants)}>
            <Title className="mx-auto mt-4 max-w-100 text-foreground-muted">
              Questions about reservations, private events, or just want to say
              hi? We'd love to hear from you.
            </Title>
          </motion.div>
        </motion.div>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
