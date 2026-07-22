"use client";

import Image from "next/image";
import {
  Martini,
  Citrus,
  CupSoda,
  Beer,
  Droplets,
  Wine,
  GlassWater,
} from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";

// import PennantTag from "@/components/utils/PennantTag";
// NOTE: swap the inline PennantTagStub below for your real PennantTag
// component, same as in FoodMenuSection.jsx.

/* ------------------------------------------------------------------
   DRINKS DATA — transcribed from the official drinks menu PDF.
   No prices are listed anywhere in the source menu for cocktails,
   beer, wine, or spirits — that appears intentional (server-quoted
   pricing), so none is shown here either.
------------------------------------------------------------------- */

const SPECIAL_COCKTAILS = [
  {
    name: "Lakefront Swing",
    description:
      "Ketel One Peach and Orange Blossom Vodka, Peach Soju, Clear Citrus, Electric Dust",
  },
  {
    name: "Wrigley Punch",
    description: "Vanilla Vodka, Passion Fruit, Lime, Tropical Red Bull",
  },
  {
    name: "Super Bowl Shuffle",
    description: "Sazerac Rye Whiskey, Crown Apple, Fresh Sour, Red Wine Float",
  },
  {
    name: "Southside Spritz",
    description: "Bacardi Rum, Mango Puree, Fresh Lime, Topped with Soda",
  },
  {
    name: "Power Play Punch",
    description:
      "Don Q Orange Rum, Select Aperitivo, Lime, Pineapple, Hellfire Shrub",
  },
  {
    name: "The Side Pocket Martini",
    description: "Smirnoff Vanilla Vodka, Strawberry Puree, Pineapple Juice",
  },
  {
    name: "The Friendly Confines",
    description:
      "Hendrick Gin or Titos Vodka, Lime, Blue Curacao, Coconut, Pineapple",
  },
  {
    name: "The Back Nine",
    description: "Rum, Melon, Kiwi, Orgeat (Almond Allergy), Lime",
  },
  {
    name: "Caddies Choice",
    description: "Casamigo's Reposado, Lime, Spiced Pear Liqueur, Agave",
  },
  {
    name: "HOME Bar Birdie",
    description: "Vodka, Cranberry, Pineapple, Chambord",
  },
];

const CLASSIC_FAVORITES = [
  {
    name: "Margarita",
    description: "Tequila, Orange Liqueur, Lime Juice, Agave, Soda",
    note: "Choose your flavor: Classic, Mango, Jalapeño, Spiced Pear",
  },
  {
    name: "Paloma",
    description:
      "Tequila, Lime Juice, Pink Grapefruit Juice, House Simple Syrup, Soda",
  },
  {
    name: "Long Island Iced Tea",
    description: "Vodka, Gin, Rum, Tequila, Orange Liqueur, Lemon Juice, Coke",
  },
  { name: "John Daly", description: "Vodka, Lemonade, Iced Tea" },
  { name: "Moscow Mule", description: "Vodka, Lime Juice, Ginger Beer" },
  {
    name: "Mojito",
    description: "Rum, Lime Juice, Mint, House Simple Syrup, Soda",
  },
  {
    name: "Cosmopolitan",
    description: "Vodka, Triple Sec, Cranberry Juice, Lime Juice",
  },
  {
    name: "Dirty Martini",
    description: "Vodka (or Gin), Dry Vermouth, Olive Brine",
  },
  {
    name: "Do Big Things Bloody Mary",
    description: "Vodka, Lemon Juice, Bloody Mix",
    note: "Add toppings",
  },
  {
    name: "Mai Tai",
    description:
      "Rum, Dark Rum Float, Triple Sec, Lime Juice, Simple Syrup, Cherry",
  },
  {
    name: "Aperol Spritz",
    description: "Aperol, Prosecco, Orange Slice, Soda",
  },
  {
    name: "Hugo Spritz",
    description: "Prosecco, Elderflower Liqueur, Soda, Fresh Mint",
  },
];

// The right-column strip in the source menu: one item with real
// ingredients (Jugs), the rest are server-guided categories with a
// short blurb rather than an itemized list.
const BAR_CATEGORIES = [
  {
    title: "Jugs",
    icon: CupSoda,
    description:
      "Game Day Punch — Titos Vodka, Lemonade, Cranberry Juice, Pineapple Juice, Berry Seltzer, Soda",
  },
  {
    title: "Beers",
    icon: Beer,
    description: "40 beers on tap. Ask your server if your favorite is on tap.",
  },
  {
    title: "Seltzers & Cans",
    icon: Droplets,
    description:
      "Large selection of seltzers, canned and bottled beers, including non-alcoholic.",
  },
  {
    title: "Wine & Champagne",
    icon: Wine,
    // NOTE: the source menu has no body copy under this heading —
    // confirm actual wording with the client before shipping.
    description: "Ask your server for our current selection.",
  },
  {
    title: "Spirits",
    icon: GlassWater,
    description: "Great selection — ask your server for more details.",
  },
];

/* ------------------------------------------------------------------ */

const COLUMN_CLASS = {
  1: "flex flex-col",
  2: "sm:columns-2 sm:gap-8",
  3: "sm:columns-2 lg:columns-3 sm:gap-8",
};

function DrinkCategoryCard({ title, icon: Icon, items, columns = 1 }) {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <div className="relative border border-olive/50 bg-background p-6">
      <div className="relative -mx-6 -mt-6 mb-4 h-20 sm:h-24">
        <motion.div
          variants={v(headerVariants)}
          className="relative z-10 flex justify-between h-full items-center gap-1"
        >
          <PennantTag ribbonImage={ribbonLime}>{title}</PennantTag>
          <span className="mx-5 hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-olive bg-background text-olive">
            <Icon className="h-4 w-4" />
          </span>
        </motion.div>
      </div>

      <ul className={COLUMN_CLASS[columns] ?? COLUMN_CLASS[1]}>
        {items.map((item) => (
          <li
            key={item.name}
            className="break-inside-avoid border-t border-surface-border py-3 first:border-t-0 sm:first:pt-0"
          >
            <Title className="uppercase">{item.name}</Title>
            {item.description && (
              <Text className="mt-0.5 text-foreground-muted">
                {item.description}
              </Text>
            )}
            {item.note && <Text className="mt-0.5 text-lime">{item.note}</Text>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DrinksMenuSection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background photo — replace ImagePlaceholder with a real <Image>
          (e.g. assets.menu.drinksBackground) once the asset is ready. */}
      <Image
        src="/images/assets/section-bg-1.jpg"
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
          className="relative z-10"
        >
          <motion.div
            variants={v(headerVariants)}
            className="mb-10 text-center"
          >
            <Subheading>Drinks Menu</Subheading>
            <Title className="mt-1 uppercase text-lime">
              Ice cold drinks. All night long.
            </Title>
            <DividerFlourish className="mx-auto mt-2 w-24" />
          </motion.div>

          {/* Signature + classic cocktail lists */}
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <DrinkCategoryCard
              title="Special Cocktails"
              icon={Martini}
              items={SPECIAL_COCKTAILS}
              columns={2}
            />
            <DrinkCategoryCard
              title="Classic Favorites"
              icon={Citrus}
              items={CLASSIC_FAVORITES}
              columns={2}
            />
          </div>

          {/* Everything else: jugs, beer, seltzers, wine, spirits */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BAR_CATEGORIES.map(({ title, icon: Icon, description }) => (
              <motion.div
                variants={v(itemVariants)}
                key={title}
                className="flex flex-col items-center gap-3 border border-olive/50 bg-background-alt/60 px-4 py-6 text-center"
              >
                <Icon className="h-12 w-12 text-lime" />
                <Title className="uppercase">{title}</Title>
                <Text className="text-foreground-muted">{description}</Text>
              </motion.div>
            ))}
          </div>

          {/* Closing tagline — matches the footer banner on the printed menu */}
          <motion.div
            variants={v(headerVariants)}
            className="mt-10 text-center"
          >
            <Title className="italic text-lime">Watch Every Game</Title>
            <Subheading className="mt-1 uppercase">
              Cold Drinks. <span className="text-accent">Hot Slots.</span>
            </Subheading>
          </motion.div>
        </motion.div>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
