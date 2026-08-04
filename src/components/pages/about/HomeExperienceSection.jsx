"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import sectionBg1 from "../../../../public/images/assets/section-bg-1.jpg";

import tablesArea from "../../../../public/images/assets/tables-area.png";
import barCounter from "../../../../public/images/assets/bar-counter.png";
import barAtmosphere from "../../../../public/images/assets/about-homeexperience-image.png";
import watchSports from "../../../../public/images/assets/entertainment/watch-sports.jpeg";
import liveDj from "../../../../public/images/assets/entertainment/live-dj.jpg";
import liveEntertainment from "../../../../public/images/assets/entertainment/live-entertainment.jpg";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * The checklist that used to live here was six lines of text next to a
 * single stock-ish photo — it told visitors what they'd get without ever
 * showing it. Each promise now carries the photograph that proves it.
 *
 * `span` drives an asymmetric bento at lg: one 2x2 anchor tile, two
 * square tiles, and three wide tiles filling a 4x3 grid exactly, with no
 * empty cells. Tile shape is matched to source orientation on purpose —
 * the two portrait phone photos (DJ deck, wrestling night) sit in the
 * square cells, and the wide room shots take the 2-wide cells, so
 * nothing gets a punishing crop.
 */
const EXPERIENCES = [
  {
    label: "Unforgettable Atmosphere",
    image: barAtmosphere,
    alt: "Beer flights lined up on the bar beneath the neon-lit screens at HOME Sports Bar",
    span: "col-span-2 lg:row-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    label: "Premium Sound System",
    image: liveDj,
    alt: "A DJ mixing on decks during a night at HOME Sports Bar",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    label: "Weekly Events & Promotions",
    image: liveEntertainment,
    alt: "Live wrestling event in the ring at HOME Sports Bar",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    label: "Multiple HD Screens",
    image: watchSports,
    alt: "Projector screen and wall-mounted TVs showing a Cubs game",
    span: "lg:col-span-2",
    sizes: "(min-width: 1024px) 50vw, 50vw",
  },
  {
    label: "Friendly Staff",
    image: barCounter,
    alt: "Bartenders serving guests along the main bar counter",
    span: "lg:col-span-2",
    sizes: "(min-width: 1024px) 50vw, 50vw",
  },
  {
    label: "Spacious & Comfortable Seating",
    image: tablesArea,
    alt: "Rows of high-top tables and bar seating across the main floor",
    span: "col-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
];

function ExperienceTile({ label, image, alt, span, sizes, v }) {
  return (
    <motion.li
      variants={v(itemVariants)}
      className={`group relative overflow-hidden rounded-sm shadow-lg ${span}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Scrim only where the label sits, so the photo stays bright */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 sm:p-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime">
          <Check className="h-4 w-4 text-background" strokeWidth={3} />
        </span>
        <Title className="uppercase leading-tight text-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
          {label}
        </Title>
      </div>
    </motion.li>
  );
}

export default function HomeExperienceSection() {
  const v = useSafeVariants();

  return (
    <section className="relative bg-background">
      {/* Backdrop deliberately recedes: the tiles are the content now, so
          the concrete texture is left dark rather than the bright olive
          duotone this section used when it was mostly text. */}
      <Image
        src={sectionBg1}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 z-0 bg-background/75" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <motion.div
            variants={v(headerVariants)}
            className="mb-10 flex flex-col items-center text-center"
          >
            <Subheading>The Home Experience</Subheading>
            <DividerFlourish className="mt-2 w-24" />
            <Text className="mt-4 max-w-xl text-foreground-muted">
              We believe every visit should feel like game night with your
              closest friends — here&apos;s what that looks like.
            </Text>
          </motion.div>

          <ul className="grid grid-cols-2 gap-4 auto-rows-40 sm:auto-rows-48 lg:grid-cols-4 lg:auto-rows-56">
            {EXPERIENCES.map((item) => (
              <ExperienceTile key={item.label} {...item} v={v} />
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
