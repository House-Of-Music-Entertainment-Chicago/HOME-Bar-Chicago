"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import { useBodyScrollLock } from "@/app/hooks/UseBodyScrollLock";

import { motion } from "framer-motion";
import { groupVariants, itemVariants } from "@/content/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * `albums` comes from the Wix CMS (see src/lib/getGalleryAlbums.js). Each
 * album becomes a filter tab, so a new album the client creates in the
 * Wix dashboard shows up here as a new tab with no code change.
 */
export default function GalleryGridSection({ albums = [] }) {
  const v = useSafeVariants();
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filters = useMemo(
    () => [
      { id: "all", label: "All" },
      ...albums.map((album) => ({ id: album.id, label: album.title })),
    ],
    [albums],
  );
  const allItems = useMemo(
    () => albums.flatMap((album) => album.items),
    [albums],
  );
  const photos = useMemo(
    () =>
      active === "all"
        ? allItems
        : allItems.filter((p) => p.category === active),
    [active, allItems],
  );
  const videoCount = photos.filter((p) => p.type === "video").length;
  const photoCount = photos.length - videoCount;

  // The shared 0.08s-per-tile stagger is tuned for a handful of items.
  // With 100+ photos it would take 8s+ for the last tile to fade in,
  // leaving empty squares for anyone who scrolls quickly, so the whole
  // cascade is squeezed into ~1.2s however many photos the filter shows.
  const gridVariants = useMemo(() => {
    const { staggerChildren, ...rest } = groupVariants.visible.transition;
    return {
      ...groupVariants,
      visible: {
        transition: {
          ...rest,
          staggerChildren: Math.min(staggerChildren, 1.2 / photos.length),
        },
      },
    };
  }, [photos.length]);

  // Reuses the shared reference-counted lock so the lightbox can't fight
  // the mobile nav over document.body.style.overflow.
  useBodyScrollLock(openIndex !== null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      // A focused <video> uses the arrow keys to seek; let it keep them
      // instead of also jumping to the next item.
      else if (e.target instanceof HTMLVideoElement) return;
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  const open = openIndex !== null ? photos[openIndex] : null;

  return (
    // Pulled up under the hero's chevron to fill the clipped corners.
    <section className="shield-notch-join relative bg-background">
      <Container className="relative">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters.map((f) => {
            const isActive = f.id === active;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setActive(f.id);
                  setOpenIndex(null);
                }}
                aria-pressed={isActive}
                className={`font-heading text-lg uppercase tracking-wide transition-colors sm:text-xl border px-4 py-1.5 ${
                  isActive
                    ? "border-lime bg-lime text-background"
                    : "border-olive/50 text-foreground-muted hover:border-lime hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <Text className="mb-8 text-center text-foreground-muted">
          Showing {photoCount}{" "}
          {photoCount === 1 ? "photograph" : "photographs"}
          {videoCount > 0 &&
            ` and ${videoCount} ${videoCount === 1 ? "video" : "videos"}`}
        </Text>

        {/* Grid. Uniform squares on purpose: the filter changes the item
            count, and a mixed-span bento leaves holes at some counts
            whereas a uniform grid never does. */}
        <motion.ul
          key={active}
          initial="hidden"
          animate="visible"
          variants={v(gridVariants)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {photos.map((photo, i) => (
            // id, not src: the client could put the same photo in two
            // albums, which would give two tiles the same src.
            <motion.li key={photo.id} variants={v(itemVariants)}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={
                  photo.type === "video" ? `Play video: ${photo.alt}` : undefined
                }
                className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-sm"
              >
                {/* Video tiles show their poster still; no video bytes are
                    downloaded until the lightbox opens it. A video whose
                    poster didn't resolve gets a plain dark tile with the
                    play icon rather than handing <Image> a video URL. */}
                {photo.type === "video" && !photo.poster ? (
                  <div className="absolute inset-0 bg-surface" />
                ) : (
                  <Image
                    src={photo.type === "video" ? photo.poster : photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/40" />
                {photo.type === "video" ? (
                  // Always visible, not hover-only: it's what tells people
                  // this tile is a video, and touch screens have no hover.
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lime bg-background/70 text-lime transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                  </span>
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-8 w-8 text-lime drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" />
                  </span>
                )}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          onClick={close}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-olive/60 text-foreground transition-colors hover:border-lime hover:text-lime"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-olive/60 text-foreground transition-colors hover:border-lime hover:text-lime sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-olive/60 text-foreground transition-colors hover:border-lime hover:text-lime sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* stopPropagation so clicking the photo itself doesn't dismiss */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-3"
          >
            <div className="relative h-[70vh] w-full">
              {/* sizes must describe the rendered box, not the viewport.
                  The figure is capped at max-w-5xl (64rem) inside a p-4
                  backdrop, so above ~1056px the image stops growing with
                  the window. Declaring 100vw here made Next pick a
                  2048w-class file for a slot that never exceeds 1024px. */}
              {open.type === "video" ? (
                // key forces a fresh element per item, so stepping away
                // stops playback instead of the old video carrying on.
                // autoPlay is fine here: opening the tile was the request
                // to watch, so this never starts sound unprompted.
                // Multiple <source>s: if one is missing (a video uploaded
                // below 720p has no 720p copy), the browser moves on to
                // the next instead of showing an error.
                <video
                  key={open.id}
                  poster={open.poster}
                  aria-label={open.alt}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  {(open.sources ?? [open.src]).map((url) => (
                    <source key={url} src={url} type="video/mp4" />
                  ))}
                </video>
              ) : (
                <Image
                  src={open.src}
                  alt={open.alt}
                  fill
                  sizes="(min-width: 1056px) 1024px, calc(100vw - 2rem)"
                  className="object-contain"
                />
              )}
            </div>
            <figcaption className="text-center">
              <Title className="text-foreground">{open.alt}</Title>
              <Text className="mt-1 text-foreground-muted">
                {openIndex + 1} / {photos.length}
              </Text>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
