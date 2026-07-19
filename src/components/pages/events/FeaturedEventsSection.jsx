import Image from "next/image";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import Container from "@/components/utils/Container";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import DividerFlourish from "@/components/utils/DividerFlourish";
import RibbonButton from "@/components/utils/Ribbonbutton";

const FEATURED_EVENTS = [
  {
    title: "UFC Fight Night Watch Party",
    when: "Saturday, June 1 • 9PM",
    description:
      "Live on our big screens with full sound. Food & drink specials.",
  },
  {
    title: "Live Acoustic Night",
    when: "Sunday, June 2 • 7PM",
    description: "Chill vibes, great music, and your favorite drinks.",
  },
  {
    title: "Championship Boxing",
    when: "Friday, June 7 • 9PM",
    description: "Big fights. Big sound. You don't want to miss this.",
  },
  {
    title: "Friday Night Live with The Breakaways",
    when: "Friday, June 14 • 9PM",
    description: "High energy live band all night long.",
  },
];

export default function FeaturedEventsSection() {
  return (
    <section className="relative bg-background">
      <Image
        src="/images/assets/events-featuredevents-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container className="relative">
        <Subheading className="text-center">Featured Events</Subheading>
        <DividerFlourish className="mb-8" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_EVENTS.map((event) => (
            <div
              key={event.title}
              className="flex flex-col border border-olive/40 bg-background-alt/40"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <ImagePlaceholder
                  label="Event photo"
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <Title className="uppercase">{event.title}</Title>
                <Text className="uppercase text-lime">{event.when}</Text>
                <Text className="flex-1 text-foreground-muted">
                  {event.description}
                </Text>
                <RibbonButton>Reserve Now</RibbonButton>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
