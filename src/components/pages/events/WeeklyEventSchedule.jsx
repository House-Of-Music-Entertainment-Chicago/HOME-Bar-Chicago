import {
  Beer,
  Trophy,
  HelpCircle,
  Music,
  Guitar,
  Headphones,
  Swords,
} from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import Container from "@/components/utils/Container";

// NOTE: the source mockup's description column read a little
// inconsistently between rows (a couple of days seemed to have
// copy meant for a different day). Rewrote these to match each
// day's actual event — worth a quick confirm with the client.
const SCHEDULE = [
  {
    icon: Beer,
    day: "Monday",
    time: "4PM – 8PM",
    description: "Happy Hour — half off drinks and appetizers",
  },
  {
    icon: Trophy,
    day: "Tuesday",
    time: "7PM Onwards",
    description: "Pool Tournament — cash prizes for the top shooters",
  },
  {
    icon: HelpCircle,
    day: "Wednesday",
    time: "7PM Onwards",
    description: "Quiz Night — fun, prizes, bragging rights",
  },
  {
    icon: Music,
    day: "Thursday",
    time: "7PM Onwards",
    description: "Trivia Thursday — test your knowledge",
  },
  {
    icon: Guitar,
    day: "Friday",
    time: "9PM Onwards",
    description: "Friday Night Live — live band performance",
  },
  {
    icon: Headphones,
    day: "Saturday",
    time: "10PM Onwards",
    description: "DJ Saturdays — non-stop party vibes",
  },
  {
    icon: Swords,
    day: "Sunday",
    time: "9PM Onwards",
    description: "UFC Watch Party — every fight, every round",
  },
];

export default function WeeklyScheduleSection() {
  return (
    <section className="bg-background">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_2fr]">
        <div>
          <Title className="font-heading text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Weekly Event
            <br />
            Schedule
          </Title>
        </div>

        <div className="flex flex-col divide-y divide-surface-border border-y border-surface-border">
          {SCHEDULE.map(({ icon: Icon, day, time, description }) => (
            <div
              key={day}
              className="flex flex-col items-start gap-2 py-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              <p className="w-24 shrink-0 font-heading text-sm font-bold uppercase tracking-wide text-white">
                {day}
              </p>
              <p className="w-32 shrink-0 text-xs text-foreground-muted sm:text-sm">
                {time}
              </p>
              <p className="flex-1 text-xs text-foreground-muted sm:text-sm">
                {description}
              </p>
              <button
                type="button"
                className="shrink-0 border border-olive px-3 py-1.5 font-heading text-[11px] font-bold uppercase tracking-wide text-olive transition-colors hover:bg-olive hover:text-white sm:text-xs"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
