import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
// import { assets } from "@/lib/assets";
// NOTE: point HERO_BG and SIGNATURE_BURGER below at your real asset keys
// once they're added to assets.js, e.g. assets.menu.heroBackground

export default function MenuHero() {
  return (
    <section className="relative bg-background">
      {/* Background photo — you said you already have this asset, so this
          <Image> is wired up and ready; just point `src` at it. */}
      <div className="absolute inset-0">
        <Image
          src="/images/assets/menu-hero-bg.png" // TODO: swap for your actual hero bg path
          alt="Burger, fries and beer from HOME Bar"
          fill
          sizes="100vw"
          priority
          className="object-cover object-right lg:object-center opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/30 to-background/10" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Left — copy */}
        <div className="flex flex-col gap-4">
          <div>
            <Heading>Our Menu</Heading>
            <Subheading className="mt-2 font-heading text-xl font-bold uppercase leading-tight text-lime sm:text-2xl">
              Good food. Cold drinks.
              <br />
              Great company.
            </Subheading>
            <DividerFlourish className="mx-0 mt-3 w-20" />
          </div>

          <Title className="max-w-md text-foreground-muted">
            From bar favorites to signature dishes, every bite is made for game
            nights and unforgettable moments.
          </Title>

          {/* <PennantTag
            className="mt-2 inline-block w-fit -rotate-2"
            ribbonImage={ribbonLime}
          >
            Eat. Drink. Watch. Repeat.
          </PennantTag> */}
        </div>

        {/* Right — featured dish */}
        <div className="relative">
          {/* Hand-drawn style annotation pointing at the dish */}
          <div className="absolute right-20 -top-80 hidden max-w-36 rotate-2 text-right font-body text-sm italic text-white/90 sm:block">
            The HOME
            <br />
            Signature Burger
            <svg
              className="ml-auto mt-1 h-8 w-10 -scale-x-100 text-white/70"
              viewBox="0 0 40 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4C15 4 32 10 36 26" strokeLinecap="round" />
              <path
                d="M28 24L36 26L33 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Container>
      <PaperDivider />
    </section>
  );
}
