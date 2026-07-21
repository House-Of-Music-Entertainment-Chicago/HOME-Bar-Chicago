import Image from "next/image";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";

// import { assets } from "@/lib/assets";

const HIGHLIGHTS = [
  {
    label: "Home MVP Burger",
    assetKey: "mvpBurger",
    src: "/images/assets/menu/food/burger-w-fries.jpeg",
  },
  {
    label: "Buffalo Wings",
    assetKey: "buffaloWings",
    src: "/images/assets/menu/food/buffalo-wings.jpeg",
  },
  {
    label: "Home Bar Special Pizza",
    assetKey: "specialPizza",
    src: "/images/assets/menu/food/special-pizza.jpeg",
  },
  {
    label: "Beers",
    assetKey: "beers",
    src: "/images/assets/menu/drinks/beer.jpg",
  },
  {
    label: "Signature Cocktails",
    assetKey: "signatureCocktails",
    src: "/images/assets/menu/drinks/drink-2.webp",
  },
];

export default function MenuHighlights() {
  return (
    <section className="bg-background">
      <Container>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <div className="absolute -top-2 -left-5 -rotate-5 z-10">
            <PennantTag ribbonImage={ribbonLime}>
              Eat. Drink. Watch. Repeat.
            </PennantTag>
          </div>
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="group relative aspect-square overflow-hidden"
            >
              {/* <ImagePlaceholder
                label={item.label}
                className="absolute inset-0 h-full w-full"
              /> */}

              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 py-3">
                <Title className="text-center uppercase">{item.label}</Title>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
