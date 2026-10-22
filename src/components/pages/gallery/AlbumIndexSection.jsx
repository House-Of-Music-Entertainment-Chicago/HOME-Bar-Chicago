"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/utils/Container";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import RibbonButton from "@/components/utils/Ribbonbutton";
import StackedPrints from "./sub-components/StackedPrints";

import { motion } from "framer-motion";
import { groupVariants, itemVariants, headerVariants } from "@/content/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * The gallery's front page: every album the client has published in Wix,
 * in display order (newest first unless pinned with Sort order). The first
 * album leads at full width; the rest follow in a grid. Each album is drawn
 * as a stack of its own prints and links to /gallery/<slug>.
 *
 * `albums` are summaries (toAlbumSummary), not full item lists, so this
 * page stays light however large the albums grow.
 */
export default function AlbumIndexSection({ albums = [] }) {
  const v = useSafeVariants();
  const [lead, ...rest] = albums;

  return (
    // Pulled up under the hero's chevron to fill the clipped corners.
    <section className="shield-notch-join relative bg-background">
      <Container className="relative">
        {!lead ? (
          <div className="flex flex-col items-center gap-6 py-10 text-center">
            <Title className="max-w-md text-foreground-muted">
              New photos are on the way. Come catch a game and you might be in
              the next album.
            </Title>
            <RibbonButton href="/events" target="_self" className="text-background">
              See What&apos;s On
            </RibbonButton>
          </div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={v(groupVariants)}
            >
              <Link
                href={`/gallery/${lead.slug}`}
                className="group grid items-center gap-10 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-lime lg:grid-cols-[1.35fr_1fr] lg:gap-20"
              >
                <motion.div variants={v(itemVariants)} className="px-[4%] lg:px-0">
                  <StackedPrints
                    prints={lead.prints}
                    sizes="(min-width: 1024px) 55vw, 90vw"
                    priority
                  />
                </motion.div>

                <motion.div
                  variants={v(headerVariants)}
                  className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left"
                >
                  <Subheading className="text-balance uppercase leading-[0.9]">
                    {lead.title}
                  </Subheading>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                    {lead.countLabel}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 font-heading text-2xl uppercase tracking-wide text-lime lg:text-3xl">
                    View album
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {rest.length > 0 && (
              <div className="mt-24 lg:mt-32">
                <div className="mb-12 flex items-center gap-6">
                  <h2 className="font-heading text-4xl uppercase text-foreground md:text-5xl">
                    More albums
                  </h2>
                  <span className="h-px flex-1 bg-olive/40" aria-hidden="true" />
                </div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={v(groupVariants)}
                  className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((album) => (
                    <motion.li key={album.slug} variants={v(itemVariants)}>
                      <Link
                        href={`/gallery/${album.slug}`}
                        className="group flex flex-col gap-5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-lime"
                      >
                        <div className="px-[5%]">
                          <StackedPrints
                            prints={album.prints}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          />
                        </div>
                        <div className="flex items-end justify-between gap-4 border-t border-olive/30 pt-4">
                          <div>
                            <h3 className="font-heading text-3xl uppercase leading-none text-foreground transition-colors group-hover:text-lime lg:text-4xl">
                              {album.title}
                            </h3>
                            <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                              {album.countLabel}
                            </p>
                          </div>
                          <ArrowRight
                            className="mb-1 h-6 w-6 shrink-0 text-lime transition-transform duration-300 group-hover:translate-x-1.5"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
