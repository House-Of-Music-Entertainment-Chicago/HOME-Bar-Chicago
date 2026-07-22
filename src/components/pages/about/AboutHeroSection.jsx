"use client";

import Image from "next/image";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Container from "@/components/utils/Container";
import DividerFlourish from "@/components/utils/DividerFlourish";
import StackedPhotoCard from "./sub-components/StackedPhotoCard";
import PaperDivider from "@/components/utils/PaperDivider";
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
    <section className="relative flex flex-col items-center justify-center">
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="z-10 grid grid-cols-1 items-center gap-10 sm:grid-cols-2"
        >
          {/* Left — heading + copy */}
          <div className="flex flex-col items-center justify-center gap-3 text-center xl:items-start">
            <motion.div variants={v(headerVariants)}>
              <Heading>
                About Home
                <DividerFlourish className="mx-0 w-24" />
              </Heading>
            </motion.div>
            <motion.div
              variants={v(headerVariants)}
              className="w-[80%] text-center xl:text-start text-olive"
            >
              <Subheading>
                Our Story. Our Passion.
                <br />
                Your Home.
              </Subheading>
            </motion.div>
            <motion.div
              variants={v(headerVariants)}
              className="w-[80%] text-center xl:text-start"
            >
              <Title>
                More than just a sports bar&mdash;HOME is where great food,
                unforgettable entertainment, and the biggest sporting moments
                come together.
              </Title>
            </motion.div>
          </div>

          {/* Right — stacked photo card with the torn olive corner strip */}
          <div className="relative w-full">
            <motion.div variants={v(itemVariants)}>
              <StackedPhotoCard
                image="/images/assets/about-hero-image.PNG"
                alt="Crowd at a Home Bar Chicago live event"
                className="aspect-4/3 w-full"
              />
            </motion.div>

            {/* Torn olive strip, bottom-right corner of the photo */}
            <motion.div
              variants={v(headerVariants)}
              className="absolute -bottom-4 right-0 z-20 -rotate-1"
            >
              <PennantTag ribbonImage={ribbonLime}>
                Good Nights Start Here.
              </PennantTag>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
