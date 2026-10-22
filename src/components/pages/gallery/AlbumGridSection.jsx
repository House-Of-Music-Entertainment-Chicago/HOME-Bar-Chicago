"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { wixImageLoader, wixBlurUrl } from "@/lib/wixImage";
import GalleryLightbox from "./sub-components/GalleryLightbox";

const BATCH = 24;
const HASH = /^#photo-(\d+)$/;

// Row heights per breakpoint, in px, used both by the CSS variable that
// drives the layout and by `sizes`, so the browser picks a file close to
// the tile's real width.
const ROW = { base: 140, sm: 190, lg: 250 };

// Mirror the open photo in the URL without adding history entries.
function setHash(i) {
  const url = window.location.pathname + window.location.search + (i == null ? "" : `#photo-${i + 1}`);
  window.history.replaceState(window.history.state, "", url);
}

function tileSizes(ratio) {
  // A tile grows up to ~1.4x its basis to fill its row.
  const w = (h) => Math.ceil(ratio * h * 1.4);
  return `(min-width: 1024px) ${w(ROW.lg)}px, (min-width: 640px) ${w(ROW.sm)}px, ${w(ROW.base)}px`;
}

/**
 * The photos of one album, in a justified layout: each row is filled edge
 * to edge, every photo keeps its real proportions (nothing is cropped), and
 * each tile reserves its exact shape before the image arrives, so nothing
 * jumps while loading. Pure CSS flexbox: a tile's flex-basis is its width
 * at the row height and its flex-grow its aspect ratio, so wider photos
 * take proportionally more of the leftover space.
 *
 * Photos render in batches of 24, with the next batch triggered well
 * before the visitor reaches the end, so an album of any size costs only
 * what's on screen. Every item is still available to the viewer, which can
 * page through the whole album.
 *
 * The open photo is mirrored in the URL as #photo-N, so a link to a single
 * photo can be shared, and opening such a link goes straight to it.
 */
export default function AlbumGridSection({ album, next }) {
  const items = album.items;
  const total = items.length;

  const [visible, setVisible] = useState(Math.min(BATCH, total));
  const [openIndex, setOpenIndex] = useState(null);
  const tileRefs = useRef([]);
  const moreRef = useRef(null);

  const showUpTo = useCallback(
    (i) => setVisible((v) => Math.min(total, Math.max(v, Math.ceil((i + 1) / BATCH) * BATCH))),
    [total],
  );

  const open = (i) => {
    setOpenIndex(i);
    setHash(i);
  };

  const changeIndex = useCallback(
    (i) => {
      setOpenIndex(i);
      showUpTo(i);
      setHash(i);
    },
    [showUpTo],
  );

  const close = useCallback(() => {
    const last = openIndex;
    setOpenIndex(null);
    setHash(null);
    // Back to the photo the visitor was last looking at, scrolled into
    // view, so closing lands where the viewer left off.
    if (last != null) requestAnimationFrame(() => tileRefs.current[last]?.focus());
  }, [openIndex]);

  // Open the photo named in the URL (#photo-7): on arrival, and if the
  // visitor edits the hash or uses back/forward.
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(HASH);
      const i = m ? Number(m[1]) - 1 : -1;
      if (i >= 0 && i < total) {
        showUpTo(i);
        setOpenIndex(i);
      }
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [total, showUpTo]);

  // Load the next batch well before the visitor reaches the end.
  useEffect(() => {
    const el = moreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => Math.min(total, v + BATCH));
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, total]);

  const remaining = total - visible;

  return (
    // Pulled up under the hero's chevron to fill the clipped corners.
    <section className="shield-notch-join relative bg-background">
      {/* Wider than the site's usual Container: photos earn the width. */}
      <div className="relative mx-auto w-full max-w-[100rem] px-3 py-15 sm:px-6 lg:px-10">
        <ul className="flex flex-wrap gap-1.5 sm:gap-2">
          {items.slice(0, visible).map((item, i) => {
            const ratio = item.width / item.height;
            const isVideo = item.type === "video";
            const picture = isVideo ? item.poster : item.src;
            return (
              <li
                key={item.id}
                className="relative min-w-0 max-w-full [--row-h:140px] sm:[--row-h:190px] lg:[--row-h:250px]"
                style={{ flexGrow: ratio, flexBasis: `calc(var(--row-h) * ${ratio})` }}
              >
                <button
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`${isVideo ? "Play video" : "View photo"} ${i + 1} of ${total}: ${item.alt}`}
                  className="group relative block w-full cursor-pointer overflow-hidden bg-surface bg-cover bg-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  style={{
                    aspectRatio: `${item.width} / ${item.height}`,
                    backgroundImage: picture ? `url("${wixBlurUrl(picture, ratio)}")` : undefined,
                  }}
                >
                  {picture && (
                    <Image
                      loader={wixImageLoader}
                      src={picture}
                      alt=""
                      fill
                      sizes={tileSizes(ratio)}
                      priority={i < 4}
                      // Develops from the blurred thumbnail behind it, like
                      // a print coming up in the tray.
                      onLoad={(e) => e.currentTarget.setAttribute("data-loaded", "")}
                      className="object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-loaded:opacity-100 motion-safe:group-hover:scale-[1.04]"
                    />
                  )}

                  {isVideo && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lime bg-background/70 text-lime transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                      </span>
                    </span>
                  )}

                  {/* Caption on hover/focus, for pointer and keyboard users. */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/85 via-black/40 to-transparent px-3 pb-2.5 pt-8 text-left font-body text-xs font-semibold text-foreground transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 max-sm:hidden">
                    {item.alt}
                  </span>
                </button>
              </li>
            );
          })}
          {/* Absorbs the leftover width of the last row, so a short final
              row keeps its natural size instead of stretching huge. */}
          <li aria-hidden="true" style={{ flexGrow: 1e6, flexBasis: 0 }} />
        </ul>

        {remaining > 0 && (
          <div ref={moreRef} className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(total, v + BATCH))}
              className="cursor-pointer border border-olive/60 px-6 py-2.5 font-heading text-xl uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Show {Math.min(BATCH, remaining)} more
            </button>
          </div>
        )}

        {/* Where to next */}
        <nav
          aria-label="More albums"
          className="mt-20 flex flex-col-reverse gap-8 border-t border-olive/30 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All albums
          </Link>

          {next && (
            <Link
              href={`/gallery/${next.slug}`}
              className="group flex items-center gap-5 self-end focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime sm:self-auto"
            >
              {next.prints[0] && (
                <span className="relative block h-16 w-20 shrink-0 rotate-[-3deg] bg-paper p-1 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:rotate-0">
                  <span className="relative block h-full w-full overflow-hidden">
                    <Image
                      loader={wixImageLoader}
                      src={next.prints[0].src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                </span>
              )}
              <span className="text-right">
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  Next album
                </span>
                <span className="mt-1 flex items-center justify-end gap-2 font-heading text-3xl uppercase leading-none text-foreground transition-colors group-hover:text-lime md:text-4xl">
                  {next.title}
                  <ArrowRight className="h-6 w-6 text-lime transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </nav>
      </div>

      {openIndex != null && (
        <GalleryLightbox
          items={items}
          index={openIndex}
          albumTitle={album.title}
          onIndexChange={changeIndex}
          onClose={close}
        />
      )}
    </section>
  );
}
