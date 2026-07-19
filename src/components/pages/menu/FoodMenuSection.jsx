import Image from "next/image";
import { Utensils, Sandwich, Pizza, Soup, IceCreamCone } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
// NOTE: swap the inline PennantTagStub below for your real PennantTag
// component — it's stubbed here just to keep this file runnable on its own.

// function PennantTagStub({ label }) {
//   return (
//     <div
//       className="bg-olive px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-white sm:text-sm"
//       style={{
//         clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%, 6% 50%)",
//       }}
//     >
//       {label}
//     </div>
//   );
// }

/* ------------------------------------------------------------------
   MENU DATA — transcribed in full from the official printed menu.
   A few items carry a small icon in the source menu (next to Nachos,
   Guacamole, the tater tot basket, HOME Signature Tacos, etc.) whose
   meaning isn't clear from the scan alone — looked like a dietary or
   "customer favorite" marker. Flag it for the client before this
   goes live; I didn't guess at what it means.
------------------------------------------------------------------- */

const APPETIZERS = [
  {
    name: "Jumbo Mozzarella Sticks",
    price: "$6.99 | $10.99",
    description:
      "Mozzarella cheese and roasted garlic spread hand wrapped into wonton wrappers served with marinara sauce. (3) $6.99 | (5) $10.99",
  },
  {
    name: "Cheese Quesadilla",
    price: "$9.99",
    description:
      "Flour tortilla and a mixed blend of cheeses served with sour cream, guacamole and pico de gallo.",
    addOns: ["Add chicken or mixed vegetables $4", "Add steak or shrimp $6"],
  },
  {
    name: "Chicken Wings",
    price: "$10.99 | $18.99",
    description:
      "Tossed in your choice of hot, medium, mild, barbecue, hot honey, teriyaki, garlic parmesan, lemon oreganato, spicy dry rub, or naked. Served with carrots, celery, and your choice of ranch or blue cheese. (6) $10.99 | (12) $18.99",
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
  },
  {
    name: "Nachos",
    price: "$13.99",
    description:
      "Crispy tortilla chips topped with melted cheese, jalapeños, pico de gallo, guacamole, and sour cream.",
    addOns: ["Add grilled chicken $4", "Add chili $4", "Add steak $6"],
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
  },
];

const PIZZA = [
  {
    name: '14" HOME Bar Special Pizza',
    price: "$19.99",
    description: "Sausage, green peppers, onions, and mushrooms.",
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
  },
  {
    name: "Triple Decker Club",
    price: "$16.99",
    description:
      "Turkey, ham, bacon, havarti cheese, lettuce, tomato, avocado, and mayo on a toasted everything seasoned sourdough served with fries.",
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
  },
];

const SOUPS_SALADS = [
  {
    name: "Chicken Lemon Rice Soup",
    price: "$5.99",
    description: "Tender chicken and rice in a warm, savory lemon broth.",
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
  thumbnail,
  columns = 1,
  notes,
}) {
  const notesList = notes ? (Array.isArray(notes) ? notes : [notes]) : null;

  return (
    <div className="relative overflow-hidden border border-olive/50 bg-background p-6">
      {/* Header strip: pennant tag sits beside a full-bleed image.
          The image is pulled out to the card's actual edges with
          negative margins (no padding/margin of its own), then faded
          to the card's background color on its left side so it
          blends into the area behind the tag instead of a hard edge. */}
      <div className="relative -mx-6 -mt-6 mb-4 h-20 sm:h-24">
        <div className="relative z-10 flex justify-between h-full items-center gap-1">
          <PennantTag ribbonImage={ribbonLime}>{title}</PennantTag>
          <span className="mx-5 hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-olive bg-background text-olive">
            <Icon className="h-4 w-4" />
          </span>
        </div>
      </div>

      <ul className={COLUMN_CLASS[columns] ?? COLUMN_CLASS[1]}>
        {items.map((item) => (
          <li
            key={item.name}
            className="break-inside-avoid border-t border-surface-border py-3 first:border-t-0 sm:first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-3">
              <Title className="uppercase">{item.name}</Title>
              <Text className="whitespace-nowrap">{item.price}</Text>
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
  return (
    <section className="relative bg-background">
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
        <div className="mb-10 text-center">
          <Subheading>Food Menu</Subheading>
          <DividerFlourish className="mx-auto mt-2 w-24" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <MenuCategoryCard
              title="Appetizers"
              icon={Utensils}
              items={APPETIZERS}
              thumbnail
              columns={3}
            />
            <MenuCategoryCard
              title="Sandwiches & Entrées"
              icon={Sandwich}
              items={SANDWICHES}
              thumbnail
              columns={3}
              notes={{
                title: "A note on sides",
                body: "All burgers and sandwiches are served with fries, sweet potato fries, or coleslaw. Substitute any bun to gluten free $2.",
              }}
            />
          </div>

          <div className="flex flex-col gap-8">
            <MenuCategoryCard
              title="Pizza"
              icon={Pizza}
              items={PIZZA}
              thumbnail
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
            />
            <MenuCategoryCard
              title="Soups & Salads"
              icon={Soup}
              items={SOUPS_SALADS}
              thumbnail
              notes={{
                title: "Note",
                body: "All salads can be made into a wrap.",
              }}
            />
            <MenuCategoryCard
              title="Desserts"
              icon={IceCreamCone}
              items={DESSERTS}
              thumbnail
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
