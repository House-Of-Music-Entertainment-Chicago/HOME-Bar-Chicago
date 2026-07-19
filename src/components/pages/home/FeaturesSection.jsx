import React from "react";
import Image from "next/image";
import Container from "@/components/utils/Container";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import RibbonButton from "@/components/utils/Ribbonbutton";
import FeatureCard from "@/components/utils/FeatureCard";
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
import drink from "../../../../public/images/assets/menu//drinks/drink-1.webp";
import entertainment from "../../../../public/images/assets/entertainment/live-entertainment.jpg";
import watchSports from "../../../../public/images/assets/entertainment/watch-sports.jpeg";
import liveDj from "../../../../public/images/assets/entertainment/live-dj.jpg";
import sectionBg1 from "../../../../public//images/assets/section-bg-1.jpg";
import PaperDivider from "@/components/utils/PaperDivider";

/**
 * FeaturesSection
 * ---------------------------------------------------------------
 * The 4-column "Ice Cold Drinks / Great Food / UFC & Sports / Live
 * Entertainment" feature row, plus the "Learn More About Home" CTA
 * beneath it.
 *
 * The neon glow on each icon is a stacked drop-shadow filter (same
 * technique as the ribbon button's hard shadow, just soft/blurred
 * here instead) — NOT a raster image or icon-library feature, so
 * it stays crisp at any size and recolors instantly via the
 * --color-accent token.
 * ---------------------------------------------------------------
 */

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
    title: "Billiards & Golf Sims",
    description: "Shoot pool or tee off on our golf simulators.",
    image: sports, // TODO: real photo of the billiards table / golf sim bay
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

function FeaturesSection() {
  return (
    <section className="relative">
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container>
        <div className="flex flex-col items-center justify-center w-full">
          <Subheading className="z-1">THE HOME EXPERIENCE</Subheading>

          <DividerFlourish />

          {/* <div className="mt-10 w-full grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div> */}

          <div className="mt-10 w-full flex flex-wrap justify-center">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="w-[calc(50%-10px)] md:w-[calc(33.3333%-13.333px)] xl:w-[calc(25%-15px)]"
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <RibbonButton href="/about" tone="olive">
              Learn More About Home
            </RibbonButton>
          </div>
        </div>
      </Container>
      <PaperDivider />
    </section>
  );
}

export default FeaturesSection;
