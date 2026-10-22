"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useBodyScrollLock } from "@/app/hooks/UseBodyScrollLock";
import { wixImageLoader } from "@/lib/wixImage";

const SLIDE_MS = 320;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Full-screen viewer for one album.
 *
 * Three slides are always mounted (previous, current, next) on a track, so
 * the neighbours are already loaded when the visitor moves: a swipe drags
 * the track under the finger and a committed swipe, arrow key or button
 * slides it one step. Only the current slide mounts a <video>, so a
 * neighbouring video never plays or downloads in the background.
 *
 * Opening, closing, the URL hash and returning focus to the grid belong to
 * the parent (AlbumGridSection); this component reports through
 * onIndexChange / onClose.
 */
export default function GalleryLightbox({ items, index, albumTitle, onIndexChange, onClose }) {
  // useReducedMotion is safe here: the viewer only exists after a click,
  // never in the server render, so it can't cause a hydration mismatch.
  const reduceMotion = useReducedMotion();
  const total = items.length;
  const many = total > 1;
  const wrap = useCallback((i) => (i + total) % total, [total]);

  const dialogRef = useRef(null);
  const trackRef = useRef(null);
  const closeRef = useRef(null);
  const gesture = useRef(null);
  const justDragged = useRef(false);
  const [dragX, setDragX] = useState(0);
  const [sliding, setSliding] = useState(null); // "next" | "prev" | "back" | null
  const slidingRef = useRef(null);
  const slideTimer = useRef(null);

  useBodyScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus();
    return () => clearTimeout(slideTimer.current);
  }, []);

  // Ends a slide: steps the index (unless it was a spring-back) and resets
  // the track. Runs on the track's transitionend, or from the fallback
  // timer when that event never comes (a backgrounded tab, an interrupted
  // transition); without the timer the viewer could stay "mid-slide" and
  // ignore every later swipe. Idempotent, so whichever fires second is a
  // no-op.
  const finishSlide = useCallback(() => {
    const dir = slidingRef.current;
    if (!dir) return;
    slidingRef.current = null;
    clearTimeout(slideTimer.current);
    if (dir !== "back") onIndexChange(wrap(index + (dir === "next" ? 1 : -1)));
    setSliding(null);
    setDragX(0);
  }, [index, onIndexChange, wrap]);

  const startSlide = useCallback(
    (dir) => {
      slidingRef.current = dir;
      setSliding(dir);
      clearTimeout(slideTimer.current);
      slideTimer.current = setTimeout(finishSlide, SLIDE_MS + 120);
    },
    [finishSlide],
  );

  const step = useCallback(
    (dir) => {
      if (!many || slidingRef.current) return;
      if (reduceMotion) {
        onIndexChange(wrap(index + (dir === "next" ? 1 : -1)));
        return;
      }
      startSlide(dir);
    },
    [many, reduceMotion, onIndexChange, wrap, index, startSlide],
  );

  const onTrackTransitionEnd = (e) => {
    if (e.target === trackRef.current) finishSlide();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // Keep keyboard focus inside the viewer while it's open.
        const focusable = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), video, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      // A focused <video> uses the arrow keys to seek.
      if (e.target instanceof HTMLVideoElement) return;
      if (e.key === "ArrowRight") step("next");
      else if (e.key === "ArrowLeft") step("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  // ---- swipe ---------------------------------------------------------------
  const onPointerDown = (e) => {
    if (!many || slidingRef.current || e.button !== 0) return;
    if (e.target.closest("video, button")) return; // leave video controls alone
    gesture.current = { x: e.clientX, y: e.clientY, id: e.pointerId, dragging: false };
  };

  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.dragging) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      g.dragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDragX(dx);
  };

  const onPointerEnd = (e) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || !g.dragging) return;
    // The click that ends a drag must not count as a tap on the backdrop.
    justDragged.current = true;
    const width = trackRef.current?.offsetWidth || window.innerWidth;
    const dx = e.clientX - g.x;
    if (Math.abs(dx) > Math.max(60, width * 0.15)) step(dx < 0 ? "next" : "prev");
    else if (dx !== 0) startSlide("back");
  };

  // ---- render --------------------------------------------------------------
  const current = items[index];
  const offsets = many ? [-1, 0, 1] : [0];
  const trackShift =
    sliding === "next" ? "-100%" : sliding === "prev" ? "100%" : sliding === "back" ? "0px" : `${dragX}px`;

  // Portalled to <body> so no ancestor's stacking context can trap it, and
  // layered above the fixed Navbar (z-99999); only the IntroSplash
  // (z-999999) ever sits higher.
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${albumTitle}: photo viewer`}
      className="fixed inset-0 z-100000 flex flex-col bg-black text-foreground"
    >
      <p className="sr-only" aria-live="polite">
        {`${current.type === "video" ? "Video" : "Photo"} ${index + 1} of ${total}: ${current.alt}`}
      </p>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-heading text-xl tracking-[0.12em] text-foreground-muted" aria-hidden="true">
          <span className="text-foreground">{index + 1}</span> / {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-olive/60 transition-colors hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative min-h-0 flex-1 touch-pan-y overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClick={(e) => {
          // A tap on the dark space around the photo closes; a tap on the
          // photo itself, or the end of a drag, doesn't.
          if (justDragged.current) {
            justDragged.current = false;
            return;
          }
          if (e.target === e.currentTarget || e.target.dataset.backdrop) onClose();
        }}
      >
        <div
          ref={trackRef}
          onTransitionEnd={onTrackTransitionEnd}
          className="absolute inset-0"
          style={{
            transform: `translateX(${trackShift})`,
            transition: sliding ? `transform ${SLIDE_MS}ms ${EASE}` : "none",
          }}
        >
          {offsets.map((offset) => {
            const i = wrap(index + offset);
            const item = items[i];
            const isCurrent = offset === 0;
            return (
              <div
                // Keyed by item, so after a step the slide that was "next"
                // is reused as "current" with its image already loaded.
                // With exactly two items, previous and next are the same
                // photo, so the offset keeps the keys distinct.
                key={total === 2 ? `${item.id}:${offset}` : item.id}
                data-backdrop="true"
                aria-hidden={!isCurrent}
                className="absolute inset-0 flex items-center justify-center px-2 sm:px-20"
                style={{ transform: `translateX(${offset * 100}%)` }}
              >
                <div
                  className="relative max-h-full w-full"
                  style={{
                    aspectRatio: `${item.width} / ${item.height}`,
                    maxWidth: `min(100%, calc((100dvh - 9.5rem) * ${item.width / item.height}))`,
                  }}
                >
                  {item.type === "video" && isCurrent ? (
                    <video
                      key={item.id}
                      poster={item.poster ?? undefined}
                      aria-label={item.alt}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full bg-black object-contain"
                    >
                      {(item.sources ?? [item.src]).map((url) => (
                        <source key={url} src={url} type="video/mp4" />
                      ))}
                    </video>
                  ) : (item.type === "video" ? item.poster : item.src) ? (
                    <Image
                      loader={wixImageLoader}
                      src={item.type === "video" ? item.poster : item.src}
                      alt={isCurrent ? item.alt : ""}
                      fill
                      sizes="100vw"
                      priority={isCurrent}
                      draggable={false}
                      className="object-contain"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {many && (
          <>
            <button
              type="button"
              onClick={() => step("prev")}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-olive/60 bg-black/40 transition-colors hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => step("next")}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-olive/60 bg-black/40 transition-colors hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="relative z-10 px-5 pb-5 pt-3 text-center sm:pb-6">
        <p className="mx-auto max-w-2xl text-balance font-body text-sm font-semibold text-foreground sm:text-base">
          {current.alt}
        </p>
        {many && (
          <p className="mt-1 font-body text-xs text-foreground-muted sm:hidden">Swipe for more</p>
        )}
      </div>
    </div>,
    document.body,
  );
}
