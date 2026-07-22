"use client";

import Image from "next/image";
import { Users, Package, Sparkles } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
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

const FEATURES = [
  {
    icon: Users,
    title: "Private Spaces",
    description: "For small or large groups",
  },
  {
    icon: Package,
    title: "Custom Packages",
    description: "Food, drinks & entertainment",
  },
  { icon: Sparkles, title: "Unforgettable", description: "We handle the rest" },
];

export default function HostEventSection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative overflow-hidden bg-background">
      <Image
        src="/images/assets/events-hostevent-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover object-top"
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-3">
            <motion.div variants={v(headerVariants)}>
              <Subheading>
                Host Your
                <br />
                <span className="text-lime">Event At Home</span>
              </Subheading>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Title className="max-w-sm text-foreground-muted">
                Birthdays, corporate events, private parties, watch parties and
                more.
              </Title>
            </motion.div>

            <motion.div variants={v(buttonVariants)}>
              <RibbonButton
                href="/reservations"
                target="_blank"
                className="mt-2 mr-auto"
              >
                Inquire Today
              </RibbonButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <motion.div
                variants={v(itemVariants)}
                key={title}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-olive text-olive">
                  <Icon className="h-12 w-12" />
                </span>
                <Title className="uppercase">{title}</Title>
                <Text className="text-foreground-muted">{description}</Text>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
