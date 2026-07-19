"use client";

import React from "react";

import Image from "next/image";
import sectionBg1 from "../../../../public//images/assets/section-bg-1.jpg";
import grungeOverlay from "../../../../public/images/assets/hero-banner-bg.png";
import brickBg from "../../../../public/images/assets/brick-bg.jpg";
import heroPost1 from "../../../..//public/images/image-items/hero-post-1.jpg";
import RibbonButton from "@/components/utils/Ribbonbutton";
import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import EventCardGrid from "@/components/utils/EventCardGrid";
import PaperDivider from "@/components/utils/PaperDivider";
import Container from "@/components/utils/Container";

function HeroSection() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center">
      {/* Background layer — lowest z, sits behind everything.
          More image layers (textures, light leaks, brick overlays, etc.)
          can be added here later; just stack them above this with a
          higher z-index (z-1, z-2, ...) and below the content layer. */}
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Future layers go here, e.g.: */}
      <Image
        src={grungeOverlay}
        alt="Grunge overlay image"
        fill
        sizes="100vw"
        className="absolute inset-0 z-1 object-cover mix-blend-overlay"
      />

      {/* Content layer — sits above every background layer */}

      <Container className="z-10 flex-1 flex flex-col xl:flex-row gap-10">
        <div className="flex-1 xl:w-[50%] flex justify-center items-center">
          <div className="flex flex-col items-center xl:items-start gap-5">
            {/* Hero section main Heading */}
            <div>
              <p className="font-semibold font-body text-sm lg:text-base tracking-widest text-accent uppercase text-center xl:text-start">
                Sports Bar <span className="text-foreground">•</span> Play{" "}
                <span className="text-foreground">•</span> Entertainment
              </p>

              <Heading className="flex flex-col items-center xl:items-start">
                <span className="">THERE IS NO</span>
                <span className="">PLACE LIKE</span>
                <span className="bg-linear-to-b from-lime via-olive to-deep-cyan bg-clip-text text-transparent w-fit">
                  HOME.
                </span>
              </Heading>
            </div>

            {/* Hero section sub Heading */}
            <Title className="w-[80%] text-center xl:text-start text-lg lg:text-xl font-display font-semibold">
              HOME Sports Bar and Entertainment is a premier venue in the
              northwest suburbs for sports and entertainment.
            </Title>

            <div>
              <RibbonButton onClick={() => {}} className="">
                Reserve A Table
              </RibbonButton>
            </div>
          </div>
        </div>
        <div className="relative flex-1 xl:w-[50%] flex justify-center items-center">
          <EventCardGrid
            items={[
              {
                id: 1,
                bgImage: brickBg,
                bgAlt: "Brick Background",
                image: heroPost1,
                alt: "Hero Banner Post 1",
              },
              {
                id: 2,
                bgImage: brickBg,
                image: heroPost1,
                bgAlt: "Brick Background",
                alt: "Hero Banner Post 1",
              },
              {
                id: 3,
                bgImage: brickBg,
                image: heroPost1,
                bgAlt: "Brick Background",
                alt: "Hero Banner Post 1",
              },
              {
                id: 4,
                bgImage: brickBg,
                image: heroPost1,
                bgAlt: "Brick Background",
                alt: "Hero Banner Post 1",
              },
            ]}
          />
        </div>
      </Container>
      <PaperDivider />
    </section>
  );
}

export default HeroSection;
