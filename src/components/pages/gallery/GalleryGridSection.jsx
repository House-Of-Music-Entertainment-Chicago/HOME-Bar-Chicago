"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import { useBodyScrollLock } from "@/app/hooks/UseBodyScrollLock";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/data/gallery-images";

import { motion } from "framer-motion";
import { groupVariants, itemVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const FILTERS = [{ id: "all", label: "All" }, ...GALLERY_CATEGORIES];

export default function GalleryGridSection() {
  const v = useSafeVariants();
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const photos = useMemo(
    () =>
      active === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((p) => p.category === active),
    [active],
  );

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
          {FILTERS.map((f) => {
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
          Showing {photos.length}{" "}
          {photos.length === 1 ? "photograph" : "photographs"}
        </Text>

        {/* Grid. Uniform squares on purpose: the filter changes the item
            count, and a mixed-span bento leaves holes at some counts
            whereas a uniform grid never does. */}
        <motion.ul
          key={active}
          initial="hidden"
          animate="visible"
          variants={v(groupVariants)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {photos.map((photo, i) => (
            <motion.li key={photo.src} variants={v(itemVariants)}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-sm"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/40" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-8 w-8 text-lime drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" />
                </span>
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
            aria-label="Previous photo"
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
            aria-label="Next photo"
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
              <Image
                src={open.src}
                alt={open.alt}
                fill
                sizes="(min-width: 1056px) 1024px, calc(100vw - 2rem)"
                className="object-contain"
              />
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
