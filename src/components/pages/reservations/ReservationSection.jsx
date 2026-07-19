import Image from "next/image";
import { CalendarClock, Users, BadgeCheck } from "lucide-react";
import Heading from "@/components/utils/HeadingText";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RoughBorderFrame from "@/components/utils/RoughBorderFrame";
import OpenTableWidget from "./sub-components/OpenTableWidget";

const PERKS = [
  {
    Icon: CalendarClock,
    title: "Instant Confirmation",
    description: "Book your table in seconds.",
  },
  {
    Icon: Users,
    title: "Parties of Any Size",
    description: "From intimate dinners to game night with the crew.",
  },
  {
    Icon: BadgeCheck,
    title: "Free & Easy",
    description: "No booking fees. Ever.",
  },
];

export default function TableReservationSection() {
  return (
    <section className="relative bg-background">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Left — copy, perks, OpenTable widget */}
        <div className="flex flex-col gap-5">
          <div>
            <Heading>Table Reservations</Heading>
            <DividerFlourish className="mx-0 mt-2 w-20" />
          </div>

          <Text className="text-foreground-muted">
            Reserve your table directly through OpenTable. It&rsquo;s fast,
            easy, and confirmed instantly.
          </Text>

          <div className="grid grid-cols-3 gap-4">
            {PERKS.map(({ Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-1">
                <Icon className="h-12 w-12 text-accent filter-[drop-shadow(0_0_4px_var(--color-accent))_drop-shadow(0_0_8px_var(--color-accent))]" />
                <Title className="uppercase">{title}</Title>
                <Text className="text-foreground-muted">{description}</Text>
              </div>
            ))}
          </div>

          <OpenTableWidget />
        </div>

        {/* Right — reserved table photo, rough-bordered */}
        <div className="relative aspect-4/3 w-full">
          <Image
            src="/images/assets/entertainment/reservation-table-image.jpg"
            alt="A reserved table at Home Bar Chicago's entertainment place"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover"
          />

          <RoughBorderFrame />
        </div>
      </Container>
    </section>
  );
}
