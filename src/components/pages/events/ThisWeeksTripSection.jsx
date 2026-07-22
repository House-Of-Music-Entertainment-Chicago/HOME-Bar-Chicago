"use client";

import ImagePlaceholder from "@/components/utils/ImagePlaceholder";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import PennantTag from "@/components/utils/PennantTag";
import ribbonLime from "../../../../public/images/assets/ribbon-lime.png";
import Container from "@/components/utils/Container";
import DateBanner from "@/components/utils/DateBanner";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const WEEK_DAYS = [
  {
    day: "Mon",
    month: "May",
    date: "27",
    title: "Happy Hour",
    time: "4PM – 8PM",
  },
  {
    day: "Tue",
    month: "May",
    date: "28",
    title: "Pool Tournament",
    time: "7PM Onwards",
  },
  {
    day: "Wed",
    month: "May",
    date: "29",
    title: "Quiz Night",
    time: "7PM Onwards",
  },
  {
    day: "Thu",
    month: "May",
    date: "30",
    title: "Trivia Thursday",
    time: "7PM Onwards",
  },
  {
    day: "Fri",
    month: "May",
    date: "31",
    title: "Friday Night Live",
    time: "9PM Onwards",
  },
  {
    day: "Sat",
    month: "Jun",
    date: "01",
    title: "DJ Saturdays",
    time: "10PM Onwards",
  },
  {
    day: "Sun",
    month: "Jun",
    date: "02",
    title: "UFC Watch Party",
    time: "9PM Onwards",
    highlight: true,
  },
];

export default function ThisWeekStrip() {
  const v = useSafeVariants();

  return (
    <section className="bg-background">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div
            variants={v(headerVariants)}
            className="flex justify-center"
          >
            <PennantTag ribbonImage={ribbonLime}>This Week At HOME</PennantTag>
          </motion.div>

          <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {WEEK_DAYS.map((d) => (
              <motion.div
                variants={v(itemVariants)}
                key={d.day}
                className="relative flex flex-col border border-olive/40"
              >
                <Text className="bg-background-alt text-center uppercase text-foreground-muted">
                  {d.day}
                </Text>
                <div className="relative aspect-square w-full overflow-hidden">
                  <ImagePlaceholder
                    label="Event photo"
                    className="h-full w-full"
                  />
                  {/* Date badge — olive, per your note that this is important */}
                </div>
                <DateBanner month={d.month} day={d.date} color="olive" />
                <div className="px-2 py-2 text-center">
                  <Title className="uppercase">{d.title}</Title>
                  <Text className="mt-0.5 text-foreground-muted">{d.time}</Text>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
