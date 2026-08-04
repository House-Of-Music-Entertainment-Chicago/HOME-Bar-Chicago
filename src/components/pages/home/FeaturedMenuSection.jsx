"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
import PennantTag from "@/components/utils/PennantTag";
import RibbonButton from "@/components/utils/Ribbonbutton";

import onionRingTower from "../../../../public/images/assets/menu/food/onion-ring-tower.jpeg";
import specialPizza from "../../../../public/images/assets/menu/food/special-pizza.jpeg";
import southwestSalad from "../../../../public/images/assets/menu/food/southwest-salad.jpeg";
import philly from "../../../../public/images/assets/menu/food/the-philly-sandwich.jpeg";
import cookieSkillet from "../../../../public/images/assets/menu/food/warm-cookie-skillet.jpeg";

import beer from "../../../../public/images/assets/menu/drinks/beer.jpg";
import signatureCocktail from "../../../../public/images/assets/menu/drinks/drink-2.webp";

import { motion } from "framer-motion";
import {
  headerVariants,
  buttonVariants,
  groupVariants,
  itemVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

function MenuItemCard({ image, alt, title, v }) {
  return (
    <motion.div
      variants={v(itemVariants)}
      className="group relative aspect-square overflow-hidden rounded-sm shadow-lg"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5 sm:px-4 sm:pb-3">
        <Title className="font-display uppercase leading-tight tracking-wide text-foreground">
          {title}
        </Title>
      </div>
    </motion.div>
  );
}

// One representative shot per menu category, not the whole menu — the
// full photo set belongs on /menu itself. Showing every dish twice
// (here and again on the menu page) would just be redundant.
const CATEGORY_ITEMS = [
  {
    image: onionRingTower,
    alt: "Onion Ring Tower, an appetizer",
    title: "Appetizers",
  },
  { image: specialPizza, alt: "HOME Bar Special Pizza", title: "Pizza" },
  {
    image: southwestSalad,
    alt: "Southwest Salad",
    title: "Soups & Salads",
  },
  {
    image: philly,
    alt: "The Philly sandwich",
    title: "Sandwiches & Entrées",
  },
  { image: cookieSkillet, alt: "Warm Cookie Skillet", title: "Desserts" },
  {
    image: signatureCocktail,
    alt: "Home Signature Cocktail",
    title: "Cocktails",
  },
  { image: beer, alt: "Ice cold beer", title: "Beer" },
];

function FeaturedMenuSection() {
  const v = useSafeVariants();

  return (
    // Back to ink after the white Features band above.
    <section className="surface-dark relative overflow-x-hidden">
      <Container>
        <motion.div
          className="relative pt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          {/* Pennant tag — overlaps the top-left corner of the section */}
          <motion.div
            className="absolute -top-2 -left-5 z-10 -rotate-5"
            variants={v(headerVariants)}
          >
            <PennantTag ribbonImage={ribbonLime}>Featured Menu</PennantTag>
          </motion.div>

          <motion.div
            variants={v(headerVariants)}
            className="pt-14 pb-6 pl-2 sm:pt-4 sm:pl-40"
          >
            <Text className="max-w-md text-foreground-muted">
              A little bit of everything — from bar snacks to the full cocktail
              list.
            </Text>
          </motion.div>

          {/* Uniform square tiles. flex-wrap rather than a grid so the
              final short row (7 items over 4 columns) centers itself
              instead of leaving a hole on the right. */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="w-[calc(50%-8px)] sm:w-[calc(33.3333%-10.6667px)] lg:w-[calc(25%-12px)]"
              >
                <MenuItemCard {...item} v={v} />
              </div>
            ))}
            <div className="mt-12 flex flex-col items-center text-center">
              <motion.p
                variants={v(headerVariants)}
                className="font-heading text-4xl font-semibold uppercase sm:text-5xl"
              >
                Hungry? Thirsty?
                <br />
                <span className="text-accent">We got you.</span>
              </motion.p>

              <motion.div variants={v(buttonVariants)} className="mt-5">
                <RibbonButton
                  href="/menu"
                  target="_self"
                  className="text-background"
                >
                  Explore the Menu
                </RibbonButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedMenuSection;
