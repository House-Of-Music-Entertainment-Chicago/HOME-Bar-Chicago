"use client";

import Image from "next/image";
import Text from "@/components/utils/BodyText";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import StarRating from "@/components/utils/StarRating";
import PaperDivider from "@/components/utils/PaperDivider";
import AnimatedCounter from "@/components/utils/AnimatedCounter";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";

const STATS = [
  { value: "15+", label: "HD Screens" },
  { value: "100+", label: "Seats" },
  { value: "4", label: "Play Areas" },
  { value: "7", label: "Days a Week" },
  { value: "50+", label: "Events Every Month" },
];

export default function StatsSection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative bg-background">
      <Image
        src="/images/assets/section-bg-1.jpg"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div
            variants={v(headerVariants)}
            className="mb-10 flex flex-col items-center text-center"
          >
            <Subheading className="z-1">Home in Numbers</Subheading>
            <DividerFlourish className="mt-2 w-24" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center divide-x divide-surface-border">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-6 py-3 text-center sm:px-10 z-1"
              >
                <Subheading className=" text-olive">
                  <AnimatedCounter value={stat.value} />
                </Subheading>
                <Text className="mt-1 text-foreground-muted">{stat.label}</Text>
              </div>
            ))}

            <div className="z-1 flex flex-col items-center px-6 py-3 text-center sm:px-10">
              <StarRating
                count={5}
                height="h-8"
                width="w-8"
                className="justify-center"
              />
              <Text className="mt-2 text-foreground-muted">
                Guest Experience
              </Text>
            </div>
          </div>
        </motion.div>
      </Container>
      <PaperDivider position="bottom" />
    </section>
  );
}
