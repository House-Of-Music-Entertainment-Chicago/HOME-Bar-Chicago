import Image from "next/image";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";

// Six highlight photos for the torn "pinned to brick" collage on the
// right. Swap ImagePlaceholder for real photos as they come in —
// each one is independent, so partial rollout looks fine.
const HIGHLIGHT_EVENTS = [
  { title: "Trivia Thursday", time: "7PM Onwards" },
  { title: "Friday Night Live", time: "Live Band • 9PM Onwards" },
  { title: "UFC 305 Watch Party", time: "Live On Our Big Screens" },
  { title: "Karaoke Night", time: "9PM Onwards" },
  { title: "Acoustic Sessions", time: "Sunday • 7PM Onwards" },
  { title: "DJ Saturdays", time: "10PM Onwards" },
];

export default function EventsHero() {
  return (
    <section className="relative bg-background">
      {/* Background — grayscale crowd photo behind the left copy */}

      <Image
        src="/images/assets/events-hero-bg.png"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-background/0" />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left copy */}
        <div className="flex flex-col gap-4">
          <div>
            <Heading>
              This Week
              <br />
              At <span className="text-lime">Home</span>
            </Heading>
            <Subheading className="mt-3 uppercase text-foreground-muted">
              Sports • Live Music • UFC • Trivia • Karaoke
            </Subheading>
            <DividerFlourish className="mx-0 mt-3 w-20" />
          </div>

          <Title className="max-w-md text-foreground-muted">
            Never miss the biggest fights, live performances, and unforgettable
            nights.
          </Title>
        </div>

        {/* Right — torn photo collage pinned to a brick wall */}
        {/* <div className="relative">
          <div className="absolute inset-0 -z-10">
            <ImagePlaceholder
              label="Brick wall texture"
              className="h-full w-full opacity-70"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 p-2 sm:gap-4">
            {HIGHLIGHT_EVENTS.map((event, i) => (
              <div
                key={event.title}
                className={`relative aspect-4/3 overflow-hidden border-4 border-white/90 shadow-xl ${
                  i % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <ImagePlaceholder
                  label="Event photo"
                  className="h-full w-full"
                />
                <span className="absolute left-1 top-1 bg-white px-1.5 py-0.5 font-heading text-[9px] font-black uppercase text-background">
                  Home
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 py-2">
                  <p className="font-heading text-xs font-black uppercase leading-tight text-white sm:text-sm">
                    {event.title}
                  </p>
                  <p className="text-[10px] text-lime sm:text-xs">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}
