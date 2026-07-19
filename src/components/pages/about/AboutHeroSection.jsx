"use client";

import Image from "next/image";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";
import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import Container from "@/components/utils/Container";
import DividerFlourish from "@/components/utils/DividerFlourish";
import StackedPhotoCard from "./sub-components/StackedPhotoCard";
import PaperDivider from "@/components/utils/PaperDivider";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

export default function AboutHeroSection() {
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

      <Container className="z-10 grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
        {/* Left — heading + copy */}
        <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
          <Heading className="text-4xl uppercase leading-none sm:text-5xl">
            About Home
            <DividerFlourish className="mx-0 w-24" />
          </Heading>
          <Text className="w-[80%] text-center xl:text-start text-lg lg:text-xl font-display font-semibold text-olive">
            Our Story. Our Passion.
            <br />
            Your Home.
          </Text>

          <Title className="w-[80%] text-center xl:text-start text-lg lg:text-xl font-display font-semibold">
            More than just a sports bar&mdash;HOME is where great food,
            unforgettable entertainment, and the biggest sporting moments come
            together.
          </Title>
        </div>

        {/* Right — stacked photo card with the torn olive corner strip */}
        <div className="relative w-full">
          <StackedPhotoCard
            image="/images/assets/about-hero-image.PNG"
            alt="Crowd at a Home Bar Chicago live event"
            className="aspect-4/3 w-full"
          />

          {/* Torn olive strip, bottom-right corner of the photo */}
          <div className="absolute -bottom-4 right-0 z-20 -rotate-1">
            <PennantTag ribbonImage={ribbonLime}>
              Good Nights Start Here.
            </PennantTag>
          </div>
        </div>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
