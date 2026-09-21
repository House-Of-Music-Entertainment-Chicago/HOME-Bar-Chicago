"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/utils/Container";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import RibbonButton from "@/components/utils/Ribbonbutton";
import {
  BeerMugIcon,
  BurgerIcon,
  BoxingGloveIcon,
  GuitarIcon,
  BilliardsIcon,
  TVScreenIcon,
} from "@/data/features-icons";
import foodBundle from "../../../../public/images/assets/menu/food/food-bundle.jpeg";
import sports from "../../../../public/images/assets/sports/sports.jpeg";
import billiards from "../../../../public/images/assets/pool-table.png";
import drink from "../../../../public/images/assets/menu//drinks/drink-1.webp";
import entertainment from "../../../../public/images/assets/entertainment/live-entertainment.jpg";
import watchSports from "../../../../public/images/assets/entertainment/watch-sports.jpeg";
import liveDj from "../../../../public/images/assets/entertainment/live-dj.jpg";
import PaperDivider from "@/components/utils/PaperDivider";
import RoughBorderFrame from "@/components/utils/RoughBorderFrame";
import VirtualTourEmbed from "@/components/utils/VirtualTourEmbed";
import barCounter from "../../../../public/images/assets/bar-counter.png";

import { motion } from "framer-motion";
import {
  headerVariants,
  buttonVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

// TODO: this belongs in @/data/external-links.js alongside
// openTableReservationLink once that file is editable — it's a static
// external URL, same category as the OpenTable link.
// The trailing `47939175p&61.09h&75.73t` is TourMkr's opening viewpoint:
// panorama id, heading, tilt. Changing it changes where the visitor is
// standing (and which way they're facing) when the tour opens.
const VIRTUAL_TOUR_URL =
  "https://tourmkr.com/F1tzBmOo7X/47939175p&61.09h&75.73t";

const FEATURES = [
  {
    Icon: BeerMugIcon,
    title: "Ice Cold Drinks",
    description: "Wide selection of beers, cocktails and more.",
    image: drink,
    alt: "Ice cold drinks at Home Bar Chicago",
  },
  {
    Icon: BurgerIcon,
    title: "Great Food",
    description: "Mouth-watering dishes made for every craving.",
    image: foodBundle,
    alt: "Burger from the Home Bar Chicago menu",
  },
  {
    Icon: TVScreenIcon,
    title: "Big Screen Sports",
    description: "Every game, every Sunday, on wall-to-wall HD TVs.",
    image: watchSports,
    alt: "Large screen TVs showing sports at Home Bar Chicago",
  },
  {
    Icon: BoxingGloveIcon,
    title: "UFC & Live Events",
    description: "Wrestling, boxing, and PPV watch parties in-house.",
    image: entertainment, // TODO: real photo of a hosted watch party / crowd
    alt: "UFC and wrestling watch party at Home Bar Chicago",
  },
  {
    Icon: BilliardsIcon,
    title: "Golf Sims",
    description: "Tee off on our golf simulators.",
    image: sports, // TODO: real photo of the billiards table / golf sim bay
    alt: "Billiards table and golf simulator at Home Bar Chicago",
  },
  {
    Icon: BilliardsIcon,
    title: "Billiards",
    description: "Shoot pool with our pool tables.",
    image: billiards, // TODO: real photo of the billiards table / golf sim bay
    alt: "Billiards table and golf simulator at Home Bar Chicago",
  },
  {
    Icon: GuitarIcon,
    title: "Live Bands & DJs",
    description: "Live music and DJ sets keeping the night going.",
    image: liveDj,
    alt: "Live band performing at Home Bar Chicago",
  },
];

// Doubled so the marquee track can loop by scrolling exactly -50% —
// the second copy picks up seamlessly where the first ends.
const MARQUEE_ITEMS = [...FEATURES, ...FEATURES];

function FeaturesSection() {
  const v = useSafeVariants();

  return (
    // overflow-x-clip, NOT overflow-hidden: the full-bleed marquee below
    // is 100vw wide and would otherwise cause page-level horizontal
    // scroll, but the PaperDivider at the bottom deliberately overhangs
    // this section's edge and overflow-hidden sliced it in half.
    // `overflow-x: clip` is the one that permits `overflow-y: visible` —
    // `overflow-x: hidden` forces the other axis to compute to `auto`,
    // which would still clip (and scroll) vertically.
    // shield-notch-join slides this section up under the hero's chevron so
    // its background fills the two triangles that clip cuts away, making
    // the seam read as one continuous surface. It pairs with
    // .shield-notch-bottom on HeroSection — the two share --shield-notch.
    <section className="bg-background-alt relative overflow-x-clip shield-notch-join">
      <Container className="relative">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={v(headerVariants)}
            className="flex flex-col items-center"
          >
            <Subheading className="z-1">THE HOME EXPERIENCE</Subheading>
            <DividerFlourish />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={v(headerVariants)}
          >
            <Title className="z-1 mt-4 max-w-xl text-center text-foreground-muted">
              From ice-cold drinks to UFC watch parties, golf sims to live bands
              — every corner of HOME is built for a night worth showing up for.
            </Title>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={v(groupVariants)}
        className="marquee-viewport w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
      >
        <div className="marquee-track">
          {/* Spacing is a trailing margin owned by each item, not a
              flex `gap` — gap sits *between* siblings and doesn't
              apply after the last one, so it throws off the exact
              50% math the loop below depends on (see .marquee-track
              in globals.css) and causes a visible stutter on reset. */}
          {MARQUEE_ITEMS.map(({ Icon, title, image, alt }, i) => (
            <div
              key={`${title}-${i}`}
              aria-hidden={i >= FEATURES.length}
              className="relative mr-5 aspect-4/5 h-72 shrink-0 overflow-hidden shadow-lg sm:h-80 lg:h-96"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 70vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                <Icon className="h-6 w-6 shrink-0 text-accent" />
                <Title className="uppercase text-foreground">{title}</Title>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Plain container-width wrapper (not the <Container> component) —
          this section's own py-15 was already spent by the header
          Container above, so a second one here would double up the
          vertical gap on top of this button's own mt-10. */}
      <div className="container mx-auto px-5">
        {/* 360° walkthrough. It sits directly under the marquee on
            purpose: the strip above shows the rooms as photographs,
            this lets you actually stand in them — and it lands before
            the "Learn More" CTA rather than after it, so the proof
            comes before the ask. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="mt-14 flex flex-col items-center"
        >
          <motion.div variants={v(headerVariants)}>
            <Title className="text-center uppercase tracking-[0.2em] text-accent">
              Take a Look Around
            </Title>
          </motion.div>

          {/* aspect-4/3 on phones, 16/9 from sm up: a 16/9 tour on a
              narrow screen collapses to a letterbox slot too short to
              actually look around in. */}
          <motion.div
            variants={v(itemVariants)}
            className="relative mt-4 aspect-4/3 w-full max-w-4xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:aspect-video"
          >
            <VirtualTourEmbed
              src={VIRTUAL_TOUR_URL}
              title="360° virtual tour of HOME Sports Bar in Arlington Heights"
              poster={barCounter}
              prompt="Step Inside HOME"
              hint="Click and drag to look around"
            />
            {/* Sits above the embed's own z-20 controls layer, but it's
                pointer-events-none so it never intercepts a drag. */}
            <RoughBorderFrame className="z-30" />
          </motion.div>

          <motion.div variants={v(itemVariants)}>
            <Text className="mt-4 max-w-md text-center text-foreground-muted">
              Walk the bar, the pool room and the game floor — 360° in every
              direction, and it works on mobile too.
            </Text>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center pb-15"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(buttonVariants)}
        >
          <RibbonButton href="/about" className="text-foregroudn">
            Learn More About Home
          </RibbonButton>
        </motion.div>
      </div>
      <PaperDivider />
    </section>
  );
}

export default FeaturesSection;
