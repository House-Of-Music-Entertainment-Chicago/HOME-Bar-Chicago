"use client";

import Image from "next/image";
import Title from "@/components/utils/TitleText";
import Subheading from "@/components/utils/SubHeadingText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import StackedPhotoCard from "./sub-components/StackedPhotoCard";
import PaperDivider from "@/components/utils/PaperDivider";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

export default function OurStorySection() {
  const v = useSafeVariants();

  return (
    // Pulled up under the About hero's chevron so its background fills
    // the triangles that clip removes.
    <section className="shield-notch-join relative bg-background">
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
          className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2"
        >
          {/* Left — stacked building photo */}
          <motion.div variants={v(itemVariants)}>
            <StackedPhotoCard
              image="/images/assets/about-ourstory-image.jpg"
              alt="Home Bar Chicago building interior"
              className="aspect-4/3 w-full"
            />
          </motion.div>

          {/* Middle — heading + copy */}
          <div className="z-1 flex flex-col gap-3">
            <motion.div variants={v(headerVariants)}>
              <Subheading>Our Story</Subheading>
              <DividerFlourish className="mx-0 w-20" />
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Title className="">
                HOME was created to bring people together through sports, live
                entertainment, and great food.
              </Title>
            </motion.div>

            <motion.div variants={v(headerVariants)}>
              <Text className="text-foreground-muted">
                Whether you&rsquo;re celebrating a win, catching the biggest UFC
                fight, or enjoying a night out with friends, HOME was built to
                be the place where memories are made.
              </Text>
            </motion.div>
            <motion.div variants={v(headerVariants)}>
              <Text className="text-foreground">
                This is more than a venue. This is your HOME away from HOME.
              </Text>
            </motion.div>
          </div>
        </motion.div>
      </Container>
      <PaperDivider position="bottom" />
    </section>
  );
}
