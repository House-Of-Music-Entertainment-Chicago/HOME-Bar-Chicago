import Image from "next/image";
import Title from "@/components/utils/TitleText";
import Subheading from "@/components/utils/SubHeadingText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import StackedPhotoCard from "./sub-components/StackedPhotoCard";
import PaperDivider from "@/components/utils/PaperDivider";
import vintagePaper from "../../../../public/images/assets/vintage-paper-bg.png";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";
import TornPaper from "@/components/utils/TornPaper";

export default function OurStorySection() {
  return (
    <section className="relative bg-background">
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
        {/* Left — stacked building photo */}
        <StackedPhotoCard
          image="/images/assets/about-ourstory-image.jpg"
          alt="Home Bar Chicago building interior"
          className="aspect-4/3 w-full"
        />

        {/* Middle — heading + copy */}
        <div className="z-1 flex flex-col gap-3">
          <Subheading>Our Story</Subheading>
          <DividerFlourish className="mx-0 w-20" />
          <Title className="">
            HOME was created to bring people together through sports, live
            entertainment, and great food.
          </Title>
          <Text className="text-foreground-muted">
            Whether you&rsquo;re celebrating a win, catching the biggest UFC
            fight, or enjoying a night out with friends, HOME was built to be
            the place where memories are made.
          </Text>
          <Text className="text-foreground">
            This is more than a venue. This is your HOME away from HOME.
          </Text>
        </div>

        {/* Right — vintage paper quote card */}
        {/* <div className="relative w-full max-w-64 justify-self-center lg:justify-self-auto mx-auto">
          <TornPaper
            firstText="Good Times"
            secondText="Great People"
            thirdText="Unforgettable Nights"
          />
        </div> */}
      </Container>
      <PaperDivider position="bottom" />
    </section>
  );
}
