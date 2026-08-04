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
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import MenuItemThumbnail from "@/components/utils/MenuItemThumbnail";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

import beer from "../../../../public/images/assets/menu/drinks/beer.jpg";
import margarita from "../../../../public/images/assets/menu/drinks/drink-1.webp";
import mojito from "../../../../public/images/assets/menu/drinks/drink-2.webp";
import houseCocktail from "../../../../public/images/assets/menu/drinks/drink-3.jpg";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/* ------------------------------------------------------------------
   DRINKS DATA — transcribed from the official drinks menu PDF.
   No prices are listed anywhere in the source menu for cocktails,
   beer, wine, or spirits — that appears intentional (server-quoted
   pricing), so none is shown here either.

   Only two items have a real photo we can honestly attach — Margarita
   and Mojito, both visually confirmed against the source shots. The
   other named cocktails have no recipe-specific photo to match, so
   they render with ImagePlaceholder via MenuItemThumbnail rather than
   guessing.
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
    image: margarita,
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
    image: mojito,
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
    image: beer,
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

function DrinkCategoryCard({
  title,
  icon: Icon,
  items,
  columns = 1,
  bannerImage,
  bannerAlt,
  v = () => {},
}) {
  return (
    <div className="relative overflow-hidden border border-olive/50 bg-background p-6">
      <div className="relative -mx-6 -mt-6 mb-4 h-20 overflow-hidden sm:h-24">
        {bannerImage && (
          <>
            <Image
              src={bannerImage}
              alt={bannerAlt ?? title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/10" />
          </>
        )}
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
        {/* Each row is an @container — see the matching note in
            FoodMenuSection: the photo sits left of the text when the row
            is wide enough for both, and stacks on top when it isn't. */}
        {items.map((item) => (
          <li
            key={item.name}
            className="@container break-inside-avoid border-t border-surface-border py-4 first:border-t-0 sm:first:pt-0"
          >
            <div className="flex flex-col gap-3 @xs:flex-row @xs:items-start">
              <MenuItemThumbnail
                image={item.image}
                alt={item.name}
                className="w-full @xs:w-32 @xs:shrink-0"
              />
              <div className="min-w-0 flex-1">
                <Title className="uppercase">{item.name}</Title>
                {item.description && (
                  <Text className="mt-0.5 text-foreground-muted">
                    {item.description}
                  </Text>
                )}
                {item.note && (
                  <Text className="mt-0.5 text-lime">{item.note}</Text>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarCategoryTile({ title, icon: Icon, description, image, v }) {
  return (
    <motion.div
      variants={v(itemVariants)}
      className="group relative flex flex-col items-center gap-3 overflow-hidden border border-olive/50 px-4 py-6 text-center"
    >
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-55"
          />
        ) : (
          <ImagePlaceholder
            label="Photo"
            className="absolute inset-0 h-full w-full opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-background-alt/60" />
      </div>
      <Icon className="relative z-10 h-12 w-12 text-lime" />
      <Title className="relative z-10 uppercase">{title}</Title>
      <Text className="relative z-10 text-foreground-muted">{description}</Text>
    </motion.div>
  );
}

export default function DrinksMenuSection() {
  const v = useSafeVariants();

  return (
    // No overflow-hidden here: the PaperDivider at the bottom overhangs
    // this section on purpose. The inner cards do their own clipping.
    <section className="relative bg-background-alt">
      {/* <Image
        src="/images/assets/section-bg-1.jpg"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      /> */}
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
              bannerImage={houseCocktail}
              bannerAlt="House cocktail"
              v={v}
            />
            <DrinkCategoryCard
              title="Classic Favorites"
              icon={Citrus}
              items={CLASSIC_FAVORITES}
              columns={2}
              bannerImage={margarita}
              bannerAlt="Margarita"
              v={v}
            />
          </div>

          {/* Everything else: jugs, beer, seltzers, wine, spirits */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BAR_CATEGORIES.map((category) => (
              <BarCategoryTile key={category.title} {...category} v={v} />
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
