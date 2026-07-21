import React from "react";
import Image from "next/image";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";
import Title from "@/components/utils/TitleText";
import Subheading from "@/components/utils/SubHeadingText";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
import burger from "../../../../public/images/assets/menu/food/burger-w-fries.jpeg";
import shrimp from "../../../../public/images/assets/menu/food/rice-w-shrimp.jpeg";
import sandwich from "../../../../public/images/assets/menu/food/sandwich-w-fries.jpeg";
import drink2 from "../../../../public/images/assets/menu/drinks/drink-2.webp";
import PennantTag from "@/components/utils/PennantTag";
import TornPaper from "@/components/utils/TornPaper";

function MenuItemCard({ image, alt, title }) {
  // Normalize: plain string -> one line, one part. Flat array (old
  // shape) -> treated as a single line. Array-of-arrays -> already
  // in the line/part shape we want.
  const lines = Array.isArray(title)
    ? Array.isArray(title[0])
      ? title
      : [title]
    : [[{ text: title }]];

  return (
    <div className="relative aspect-3/4 xl:aspect-square w-full overflow-hidden rounded-sm shadow-lg">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
        <Title className="font-display uppercase leading-tight tracking-wide text-foreground">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((part, partIndex) => (
                <span
                  key={partIndex}
                  className={part.highlight ? "text-olive" : undefined}
                >
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </Title>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  {
    image: burger, // TODO: real photo of the smash burger
    alt: "Home Smash Burger",
    title: [
      [{ text: "Home " }, { text: "Smash", highlight: true }],
      [{ text: "Burger" }],
    ],
  },
  {
    image: shrimp, // TODO: real photo of the buffalo wings
    alt: "Shrimp Fried Rice",
    title: [[{ text: "Shrimp" }], [{ text: "Fried Rice" }]],
  },
  {
    image: sandwich, // TODO: real photo of the beer towers
    alt: "Sandwich with Fries",
    title: [[{ text: "Sandwich", highlight: true }], [{ text: "With Fries" }]],
  },
  {
    image: drink2, // TODO: real photo of the signature cocktail
    alt: "Home Signature Cocktails",
    title: [[{ text: "Home Signature" }], [{ text: "Cocktails" }]],
  },
];

function FeaturedMenuSection() {
  return (
    <section className="relative overflow-x-hidden">
      <Container>
        <div className="w-full flex justify-center items-center">
          {/* <div className="relative container mx-auto flex flex-wrap pt-6 sm:flex-nowrap bg-white"> */}
          <div className="relative container mx-auto grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 pt-6">
            {/* Pennant tag — overlaps the top-left corner of the section */}
            <div className="absolute -top-2 -left-5 -rotate-5 z-10">
              <PennantTag ribbonImage={ribbonLime}>
                {/* <Subheading>Featured Menu</Subheading> */}
                Featured Menu
              </PennantTag>
            </div>

            {MENU_ITEMS.map((item) => (
              <div key={item.alt} className="min-w-0 border-t border-lime">
                <MenuItemCard {...item} />
              </div>
            ))}

            <div className="col-span-2 sm:col-span-4 xl:col-span-1">
              <TornPaper
                href="/menu"
                firstText="Hungry?"
                secondText="Thirsty?"
                thirdText="We got you."
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedMenuSection;
