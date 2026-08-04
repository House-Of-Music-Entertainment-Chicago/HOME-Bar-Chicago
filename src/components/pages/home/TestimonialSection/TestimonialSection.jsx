"use client";

import PennantTag from "@/components/utils/PennantTag";
import TestimonialCard from "./TestimonialCard";
import ribbonLime from "../../../../../public/images/assets/ribbon-lime.png";
import Container from "@/components/utils/Container";
import InstagramEmbed from "./InstagramEmbed";

import { motion, useReducedMotion } from "framer-motion";
import {
  headerVariants,
  reducedVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const TESTIMONIALS = [
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark D.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine P.",
  },
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark Ds.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine Ps.",
  },
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark Dsr.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine Psr.",
  },
];

export default function TestimonialSection({
  instagramPostUrl = "https://www.instagram.com/p/DbGVlKUR-46/",
}) {
  const v = useSafeVariants();

  return (
    // Closing white band. bg-background-alt resolves to pure white here
    // rather than the dark panel colour, because surface-light re-points
    // that variable — no per-element change needed.
    <section className="overflow-x-clip surface-light bg-background-alt">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="container mx-auto flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10"
        >
          {/* Left — testimonials */}
          <div className="relative flex-1 p-5">
            <motion.div
              variants={v(headerVariants)}
              className="absolute -top-20 -left-5 z-10"
            >
              <PennantTag ribbonImage={ribbonLime}>
                What People Are Saying
              </PennantTag>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 xl:gap-10 sm:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <motion.div key={t.name} variants={v(itemVariants)}>
                  <TestimonialCard {...t} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — social callout + embedded IG post */}
          {/* <div className="flex flex-1 items-center gap-6"> */}
          <div className="relative flex flex-1 flex-col items-center lg:flex-row lg:justify-center">
            <motion.div
              variants={v(itemVariants)}
              className="shrink-0 text-center lg:text-left lg:-rotate-90"
            >
              <p className="font-display text-2xl font-black italic text-accent sm:text-3xl">
                #HomeBar
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                Follow us
                <br />
              </p>
            </motion.div>
            <motion.div variants={v(itemVariants)}>
              <InstagramEmbed
                url={instagramPostUrl}
                className="w-full sm:max-w-xs"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
