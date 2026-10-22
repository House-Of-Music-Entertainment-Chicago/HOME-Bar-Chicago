"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/utils/Container";
import DividerFlourish from "@/components/utils/DividerFlourish";
import ShieldNotch from "@/components/utils/ShieldNotch";
import { wixImageLoader } from "@/lib/wixImage";

import { motion } from "framer-motion";
import { groupVariants, headerVariants } from "@/content/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * Header of an album page: the album's cover, darkened, behind its title,
 * with the shield notch every page hero on the site ends in. Pairs with
 * shield-notch-join on AlbumGridSection.
 */
export default function AlbumHeroSection({ title, countLabel, cover }) {
  const v = useSafeVariants();

  return (
    <section className="shield-notch-bottom relative z-10 overflow-hidden bg-background">
      {cover && (
        <Image
          loader={wixImageLoader}
          src={cover.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="absolute inset-0 z-0 scale-105 object-cover object-center blur-[2px]"
        />
      )}
      <div className="absolute inset-0 z-0 bg-background/70" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background/80 via-background/20 to-background" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="mx-auto flex max-w-4xl flex-col items-center gap-4 pt-10 text-center lg:pt-16"
        >
          <motion.h1
            variants={v(headerVariants)}
            className="text-balance font-heading text-5xl font-semibold uppercase leading-[0.9] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] md:text-7xl xl:text-8xl"
          >
            {title}
          </motion.h1>
          <motion.div variants={v(headerVariants)} className="w-full">
            <DividerFlourish className="mx-auto w-24" />
          </motion.div>
          <motion.div
            variants={v(headerVariants)}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
          >
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              {countLabel}
            </p>
            <span className="hidden h-4 w-px bg-olive/60 sm:block" aria-hidden="true" />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-lime transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All albums
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <ShieldNotch />
    </section>
  );
}
