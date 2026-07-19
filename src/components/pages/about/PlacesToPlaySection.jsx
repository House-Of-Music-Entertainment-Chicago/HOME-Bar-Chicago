import Image from "next/image";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RoughBorderFrame from "../../utils/RoughBorderFrame";
import PaperDivider from "@/components/utils/PaperDivider";

const PLACES = [
  {
    image:
      "/images/assets/entertainment/about-placestoenjoy-billiards-place.png", // TODO: real photo of the billiard table
    alt: "Billiard table at Home Bar Chicago",
    title: "Billiard Place",
    description:
      "Challenge your friends to a game of pool in our premium billiard area.",
  },
  {
    image: "/images/assets/entertainment/about-placestoenjoy-golfsims.png", // TODO: real photo of the golf simulator
    alt: "Golf simulator at Home Bar Chicago",
    title: "Golf Sims",
    description:
      "Experience the world's best courses in our high-tech golf simulators.",
  },
  {
    image:
      "/images/assets/entertainment/about-placestoplayenjoy-gamesareaimage.png", // TODO: real photo of the games area
    alt: "Arcade games area at Home Bar Chicago",
    title: "Games Area",
    description: "Arcade games, table games, and more fun for everyone.",
  },
  {
    image:
      "/images/assets/entertainment/about-placestoplayenjoy-entertainment-image.png", // TODO: real photo of a live entertainment night
    alt: "Live entertainment at Home Bar Chicago",
    title: "Entertainment",
    description: "Live music, DJs, and performances that light up your night.",
  },
];

export default function PlacesToPlaySection() {
  return (
    <section className="relative bg-background">
      <Container>
        <div className="mb-10 flex flex-col items-center text-center">
          <Subheading>Places to Play &amp; Enjoy</Subheading>
          <DividerFlourish className="mt-2 w-24" />
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {PLACES.map((place) => (
            <div key={place.title} className="flex flex-col gap-3">
              <div className="relative aspect-3/4 w-full">
                {place.image ? (
                  <Image
                    src={place.image}
                    alt={place.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface text-xs text-foreground-muted">
                    TODO: photo
                  </div>
                )}
                <RoughBorderFrame />
              </div>
              <div>
                <Title>{place.title}</Title>
                <div className="mb-1 h-0.5 w-10 bg-accent" />
                <Text className="text-foreground-muted">
                  {place.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <PaperDivider position="bottom" />
    </section>
  );
}
