"use client";

import Image from "next/image";
import { Utensils, Sandwich, Pizza, Soup, IceCreamCone } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PennantTag from "@/components/utils/PennantTag";
import MenuItemThumbnail from "@/components/utils/MenuItemThumbnail";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

import mozzarellaSticks from "../../../../public/images/assets/menu/food/mozzarella-sticks.jpeg";
import cheeseQuesadilla from "../../../../public/images/assets/menu/food/cheese-quesadilla.jpeg";
import chickenWings from "../../../../public/images/assets/menu/food/buffalo-wings.jpeg";
import chickenSliders from "../../../../public/images/assets/menu/food/chicken-sliders.jpeg";
import nachos from "../../../../public/images/assets/menu/food/nachos.jpeg";
import onionRingTower from "../../../../public/images/assets/menu/food/onion-ring-tower.jpeg";
import loadedFrots from "../../../../public/images/assets/menu/food/loaded-frots.jpeg";
import spinachArtichokeDip from "../../../../public/images/assets/menu/food/spinach-artichoke-dip.jpeg";
import specialPizza from "../../../../public/images/assets/menu/food/special-pizza.jpeg";
import mvpBurger from "../../../../public/images/assets/menu/food/burger-w-fries.jpeg";
import cornedBeefReuben from "../../../../public/images/assets/menu/food/corned-beef-reuben.jpeg";
import thePhilly from "../../../../public/images/assets/menu/food/the-philly-sandwich.jpeg";
import tripleDeckerClub from "../../../../public/images/assets/menu/food/sandwich-w-fries.jpeg";
import sauteedShrimpBowl from "../../../../public/images/assets/menu/food/rice-w-shrimp.jpeg";
import macAndCheese from "../../../../public/images/assets/menu/food/mac-and-cheese-short-rib.jpeg";
import signatureTacos from "../../../../public/images/assets/menu/food/signature-tacos-trio.jpeg";
import chickenLemonRiceSoup from "../../../../public/images/assets/menu/food/chicken-lemon-rice-soup.jpeg";
import southwestSalad from "../../../../public/images/assets/menu/food/southwest-salad.jpeg";
import warmCookieSkillet from "../../../../public/images/assets/menu/food/warm-cookie-skillet.jpeg";

import { motion } from "framer-motion";
import { groupVariants, headerVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const APPETIZERS = [
  {
    name: "Jumbo Mozzarella Sticks",
    price: "$6.99 | $10.99",
    description:
      "Mozzarella cheese and roasted garlic spread hand wrapped into wonton wrappers served with marinara sauce. (3) $6.99 | (5) $10.99",
    image: mozzarellaSticks,
  },
  {
    name: "Cheese Quesadilla",
    price: "$9.99",
    description:
      "Flour tortilla and a mixed blend of cheeses served with sour cream, guacamole and pico de gallo.",
    addOns: ["Add chicken or mixed vegetables $4", "Add steak or shrimp $6"],
    image: cheeseQuesadilla,
  },
  {
    name: "Chicken Wings",
    price: "$10.99 | $18.99",
    description:
      "Tossed in your choice of hot, medium, mild, barbecue, hot honey, teriyaki, garlic parmesan, lemon oreganato, spicy dry rub, or naked. Served with carrots, celery, and your choice of ranch or blue cheese. (6) $10.99 | (12) $18.99",
    image: chickenWings,
  },
  {
    name: "Fried Cheese Curds",
    price: "$9.99",
    description:
      "Spicy breaded Wisconsin cheese curds served with blackberry mustard sauce.",
  },
  {
    name: "Bavarian Pretzel Sticks",
    price: "$8.99",
    description: "(4) served with cheddar ale and cinnamon butter.",
  },
  {
    name: "Fiesta Poppers",
    price: "$10.99",
    description:
      "(6) Red jalapeños stuffed with cream cheese served with ranch.",
  },
  {
    name: "Pot Roast Sliders",
    price: "$10.99",
    description:
      "(3) Braised beef topped with sweet glazed carrots and crispy onion straws.",
  },
  {
    name: "Chicken Sliders",
    price: "$9.99",
    description:
      "(3) Fried chicken breast tossed in Buffalo or hot honey sauce, topped with pickles.",
    image: chickenSliders,
  },
  {
    name: "Nachos",
    price: "$13.99",
    description:
      "Crispy tortilla chips topped with melted cheese, jalapeños, pico de gallo, guacamole, and sour cream.",
    addOns: ["Add grilled chicken $4", "Add chili $4", "Add steak $6"],
    image: nachos,
  },
  {
    name: "Chicken Tenders",
    price: "$11.99 | $15.99",
    description:
      "Crispy breaded chicken tenders served with your choice of dipping sauce. 5pc $11.99 | 8pc $15.99",
  },
  {
    name: "Onion Ring Tower",
    price: "$6.99",
    description:
      "A tall stack of crispy battered onion rings, served with your choice of dipping sauce.",
    image: onionRingTower,
  },
  {
    name: "Basket of Tater Tots or French Fries",
    price: "$7.99",
    description: "Choose sweet potato fries add $2.",
  },
  {
    name: "Loaded Frots",
    price: "$12.99",
    description:
      "A crispy mix of fries and tater tots topped with bacon bits, melted cheddar cheese, chopped tomatoes, green onions, jalapeños, and sour cream.",
    image: loadedFrots,
  },
  {
    name: "Buffalo Garlic Cauliflower Bites",
    price: "$10.99",
    description:
      "Crispy cauliflower florets tossed in garlic buffalo sauce, served with a side of ranch or blue cheese.",
  },
  {
    name: "Egg Rolls (3)",
    price: "$13.99",
    description:
      "Choice of southwest or cheeseburger egg rolls served with dipping sauce.",
  },
  {
    name: "Guacamole",
    price: "$12.99",
    description: "Served with tortilla chips.",
  },
  {
    name: "Spinach & Artichoke Dip",
    price: "$12.99",
    description: "Served with tortilla chips.",
    image: spinachArtichokeDip,
  },
];

const PIZZA = [
  {
    name: '14" HOME Bar Special Pizza',
    price: "$19.99",
    description: "Sausage, green peppers, onions, and mushrooms.",
    image: specialPizza,
  },
  {
    name: '14" Signature Tavern-Style Pizza',
    price: "$14.99",
    description:
      "Classic thin-crust tavern-style pizza with house tomato sauce and mozzarella.",
  },
];

const SANDWICHES = [
  {
    name: "HOME MVP Burger",
    price: "$14.99",
    description:
      "Half-pound juicy beef burger on a toasted brioche bun with lettuce, tomato, onion, and pickles.",
    addOns: ["Add cheese, egg, bacon, grilled mushrooms or onions $1.50 ea"],
    image: mvpBurger,
  },
  {
    name: "Texas BBQ Bacon",
    price: "$17.99",
    description:
      "Half pound of premium ground beef with cheddar and pepper jack cheese, grilled jalapeños, applewood smoked bacon, barbecue sauce topped with an onion ring on a brioche bun.",
  },
  {
    name: "Chicken Sandwich",
    price: "$14.99",
    description:
      "Grilled chicken breast served on a toasted brioche bun with lettuce and tomato.",
    addOns: [
      "Make it Jerk $2 — grilled chicken breast with jerk seasoning and spicy jack cheese",
      "Make it Nashville Hot $2 — fried chicken breast with Nashville hot sauce, pickles, and coleslaw",
    ],
  },
  {
    name: "Veggie Burger",
    price: "$10.99",
    description:
      "Veggie patty topped with cilantro, tomato, red onions, avocado, and provolone cheese with a spicy aioli on a brioche bun.",
  },
  {
    name: "Patty Melt",
    price: "$15.99",
    description:
      "Half-pound beef patty with grilled onions, grilled mushrooms and melted Swiss cheese on grilled rye bread.",
  },
  {
    name: "Corned Beef Reuben",
    price: "$15.99",
    description:
      "Corned beef, Swiss cheese, sauerkraut, and 1000 island dressing on grilled rye bread.",
    image: cornedBeefReuben,
  },
  {
    name: "Italian Beef Sandwich",
    price: "$11.99",
    description:
      "Thinly sliced seasoned Italian beef with sweet or hot peppers served hot on a toasted Italian roll.",
  },
  {
    name: "Sausage & Beef Combo",
    price: "$13.99",
    description:
      "Italian sausage and seasoned Italian beef with sweet or hot peppers served on a toasted Italian roll.",
  },
  {
    name: "Skirt Steak Sandwich",
    price: "$19.99",
    description:
      "Skirt steak served with grilled onions, mushrooms and choice of cheese on French bread.",
  },
  {
    name: "The Philly",
    price: "$15.99",
    description:
      "Thinly sliced tender steak, melted provolone, sautéed onions and peppers served on a classic Amoroso hoagie roll.",
    image: thePhilly,
  },
  {
    name: "Triple Decker Club",
    price: "$16.99",
    description:
      "Turkey, ham, bacon, havarti cheese, lettuce, tomato, avocado, and mayo on a toasted everything seasoned sourdough served with fries.",
    image: tripleDeckerClub,
  },
  {
    name: "Grilled Cheese",
    price: "$14.99",
    description: "Bourbon apple butter, white american, white cheddar & bacon.",
    addOns: ["Sub short rib, ham or turkey", "Plain $9.99"],
  },
  {
    name: "Sautéed Shrimp Bowl",
    price: "$16.99",
    description:
      "Shredded brussel sprouts, cherry tomatoes, and brown rice with a lemon vinaigrette.",
    image: sauteedShrimpBowl,
  },
  {
    name: "Sausage Rigatoni",
    price: "$14.99",
    description:
      "Italian sausage, roasted red peppers, and onions in a tomato garlic cream sauce topped with Grana Padano cheese and served with toasted garlic bread.",
    addOns: ["Plain buttered pasta or marinara sauce $8.99"],
  },
  {
    name: "Mac & Cheese",
    price: "$9.99",
    description: "Fusilli pasta tossed in a creamy cheese sauce.",
    addOns: [
      "Add short rib with crispy onions $5",
      "Add buffalo chicken with green onions $4",
    ],
    image: macAndCheese,
  },
  {
    name: "HOME Signature Tacos (3)",
    price: "From $12.99",
    description:
      "Topped with lettuce, cheese, pico de gallo, guacamole and sour cream.",
    addOns: [
      "Chicken $12.99",
      "Steak $15.99",
      "Shrimp $15.99",
      "Thai Shrimp $15.99 — sriracha marinated shrimp with cilantro, carrots, red cabbage, and green onions in a ginger peanut sauce",
    ],
    image: signatureTacos,
  },
];

const SOUPS_SALADS = [
  {
    name: "Chicken Lemon Rice Soup",
    price: "$5.99",
    description: "Tender chicken and rice in a warm, savory lemon broth.",
    image: chickenLemonRiceSoup,
  },
  {
    name: "Beef Chili",
    price: "$7.99",
    description:
      "Slow-simmered beef chili with or without beans and hearty spices.",
  },
  {
    name: "Caesar Salad",
    price: "$9.99",
    description:
      "Romaine lettuce, garlic croutons, and parmesan cheese tossed in a creamy Caesar dressing.",
    addOns: ["Add chicken $4", "Add steak $6"],
  },
  {
    name: "Chopped Salad",
    price: "$13.99",
    description:
      "Chopped romaine lettuce, tomatoes, cucumbers, avocados, bacon, ham, chicken, cheddar, and bleu cheese tossed in ranch dressing.",
  },
  {
    name: "Southwest Salad",
    price: "$12.99",
    description:
      "Romaine, black beans, corn, tomatoes, avocado, cheddar cheese, and tortilla strips with Southwest dressing.",
    addOns: ["Add grilled or crispy chicken $4", "Add steak $6"],
    image: southwestSalad,
  },
  {
    name: "Buffalo Chicken Salad",
    price: "$14.99",
    description:
      "Grilled chicken, romaine, tomatoes, carrots, celery, and blue cheese crumbles tossed in signature Buffalo sauce.",
  },
];

const DESSERTS = [
  {
    name: "Ice Cream H.O.M.E. Roll",
    price: "$6.99",
    description:
      "Fried vanilla ice cream filled roll, with a caramel drizzle rolled in cinnamon sugar.",
  },
  {
    name: "Warm Apple Crisp",
    price: "$7.99",
    description: "Topped with caramel and whipped cream.",
  },
  {
    name: "Warm Cookie Skillet",
    price: "$8.99",
    description:
      "Warm baked chocolate chip cookie topped with vanilla ice cream.",
    image: warmCookieSkillet,
  },
  {
    name: "Ice Cream Sundae",
    price: "$5.99",
    description:
      "Two scoops of vanilla ice cream topped with chocolate and caramel drizzle, whipped cream and a cherry.",
  },
];

/* ------------------------------------------------------------------ */

const COLUMN_CLASS = {
  1: "flex flex-col",
  2: "sm:columns-2 sm:gap-8",
  3: "sm:columns-2 lg:columns-3 sm:gap-8",
};

function MenuCategoryCard({
  title,
  icon: Icon,
  items,
  columns = 1,
  notes,
  bannerImage,
  bannerAlt,
  v = () => {},
}) {
  const notesList = notes ? (Array.isArray(notes) ? notes : [notes]) : null;

  return (
    <div className="relative overflow-hidden border border-olive/50 bg-background p-6">
      {/* Header strip: category photo behind the pennant tag, faded to
          the card's background on the left so the tag stays legible
          and the transition into the list below feels intentional. */}
      <motion.div
        variants={v(headerVariants)}
        className="relative -mx-6 -mt-6 mb-4 h-20 overflow-hidden sm:h-24"
      >
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
        <div className="relative z-10 flex h-full items-center justify-between gap-1">
          <PennantTag ribbonImage={ribbonLime}>{title}</PennantTag>
          <span className="mx-5 hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-olive bg-background text-olive">
            <Icon className="h-4 w-4" />
          </span>
        </div>
      </motion.div>

      <ul className={COLUMN_CLASS[columns] ?? COLUMN_CLASS[1]}>
        {/* Each row is an @container: the layout keys off the row's own
            width, not the viewport's, because this same markup renders
            in a full-width list (Pizza, Soups, Desserts) and in
            3-column lists (Appetizers, Sandwiches). Wide enough → photo
            sits left of the text; narrow → it stacks on top. */}
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
                <div className="flex items-baseline justify-between gap-3">
                  <Title className="uppercase">{item.name}</Title>
                  <Text className="shrink-0 whitespace-nowrap">
                    {item.price}
                  </Text>
                </div>
                {item.description && (
                  <Text className="mt-0.5 text-foreground-muted">
                    {item.description}
                  </Text>
                )}
                {item.addOns?.map((addOn) => (
                  <Text key={addOn} className="mt-0.5 text-lime">
                    {addOn}
                  </Text>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {notesList && (
        <div className="mt-4 flex flex-col gap-3 border-t border-surface-border pt-3">
          {notesList.map((note) => (
            <div key={note.title}>
              <Text className="uppercase text-lime">{note.title}</Text>
              <Text className="mt-1 text-foreground-muted">{note.body}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FoodMenuSection() {
  const v = useSafeVariants();

  return (
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
          className="relative"
        >
          <motion.div
            variants={v(headerVariants)}
            className="mb-10 text-center"
          >
            <Subheading>Food Menu</Subheading>
            <DividerFlourish className="mx-auto mt-2 w-24" />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <MenuCategoryCard
                title="Appetizers"
                icon={Utensils}
                items={APPETIZERS}
                columns={3}
                bannerImage={onionRingTower}
                bannerAlt="Onion Ring Tower"
                v={v}
              />

              <MenuCategoryCard
                title="Soups & Salads"
                icon={Soup}
                items={SOUPS_SALADS}
                bannerImage={southwestSalad}
                bannerAlt="Southwest Salad"
                notes={{
                  title: "Note",
                  body: "All salads can be made into a wrap.",
                }}
                v={v}
              />
            </div>

            <div className="flex flex-col gap-8">
              <MenuCategoryCard
                title="Pizza"
                icon={Pizza}
                items={PIZZA}
                bannerImage={specialPizza}
                bannerAlt="HOME Bar Special Pizza"
                notes={[
                  {
                    title: "Gluten free available",
                    body: "Substitute any crust to gluten free $2.",
                  },
                  {
                    title: "Additional toppings — $2 each",
                    body: "Sausage, pepperoni, bacon, mushrooms, green peppers, tomatoes, onions, olives, jalapeños, banana peppers, giardiniera.",
                  },
                ]}
                v={v}
              />

              <MenuCategoryCard
                title="Sandwiches & Entrées"
                icon={Sandwich}
                items={SANDWICHES}
                columns={3}
                bannerImage={thePhilly}
                bannerAlt="The Philly sandwich"
                notes={{
                  title: "A note on sides",
                  body: "All burgers and sandwiches are served with fries, sweet potato fries, or coleslaw. Substitute any bun to gluten free $2.",
                }}
                v={v}
              />

              <MenuCategoryCard
                title="Desserts"
                icon={IceCreamCone}
                items={DESSERTS}
                bannerImage={warmCookieSkillet}
                bannerAlt="Warm Cookie Skillet"
                v={v}
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
