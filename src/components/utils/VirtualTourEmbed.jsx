"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Move3D, Maximize, Minimize, X } from "lucide-react";

/**
 * VirtualTourEmbed
 * ---------------------------------------------------------------
 * Wraps a third-party 360° walkthrough (TourMkr) in an <iframe> and
 * solves the two problems every heavy map/tour embed has:
 *
 * 1. WEIGHT — the tour boots an entire Angular + Marzipano viewer and
 *    starts pulling panorama tiles the moment it exists. Mounting it
 *    with the rest of the homepage would drag first load down for
 *    every visitor, including the ones who never scroll this far. So
 *    the <iframe> isn't rendered at all until an IntersectionObserver
 *    says the section is approaching the viewport (400px of runway,
 *    so it's already warm by the time it's actually on screen).
 *
 * 2. SCROLL HIJACKING — a live panorama viewer swallows wheel events
 *    (it reads them as zoom) and touch-drags (it reads them as pan),
 *    so a full-width live embed becomes a trap: scroll into it and the
 *    page stops moving. The fix is the standard Google-Maps-embed
 *    pattern — a click-through shield sits over the frame and the
 *    iframe keeps `pointer-events: none` until the visitor explicitly
 *    opts in. Once active they get the real thing, and Esc / the Exit
 *    button / scrolling the section off screen all hand scrolling back.
 *
 * Fullscreen goes through the Fullscreen API on this wrapper (not the
 * iframe) so our own controls stay on top of the tour. iOS Safari
 * doesn't implement requestFullscreen on non-video elements, so the
 * button degrades to "open in a new tab" when the API is missing.
 * ---------------------------------------------------------------
 */
export default function VirtualTourEmbed({
  src,
  title,
  poster,
  posterAlt = "",
  posterSizes = "(min-width: 1024px) 66vw, 100vw",
  prompt = "Step Inside",
  hint = "Click and drag to look around",
  className = "",
}) {
  const wrapperRef = useRef(null);

  // Three independent bits of state, deliberately not collapsed into
  // one: the frame can be mounted but not yet painted (mounted ≠ ready)
  // and ready but still shielded (ready ≠ active).
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activate = useCallback(() => {
    setIsMounted(true);
    setIsActive(true);
  }, []);

  // Mount the iframe once the section gets close, then stop watching.
  // No IntersectionObserver fallback on purpose: in a browser old enough
  // to lack it the tour simply stays behind its poster, and clicking the
  // shield still mounts and activates it by hand.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-arm the shield once the tour leaves the viewport. Without this a
  // visitor who pans, scrolls past, and comes back later lands on a
  // still-live frame that eats their scroll again.
  useEffect(() => {
    if (!isActive || isFullscreen) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.every((entry) => !entry.isIntersecting)) setIsActive(false);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isActive, isFullscreen]);

  // Esc releases the tour. Skipped while fullscreen, where the browser
  // already owns Esc for exiting — handling it here too would collapse
  // both states at once and dump the visitor out entirely.
  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !document.fullscreenElement) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isActive]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    // iOS Safari doesn't implement the Fullscreen API on anything but
    // <video>, so there the button hands the visitor the tour's own
    // full-page view instead — same outcome, different mechanism.
    if (!document.fullscreenEnabled || !el.requestFullscreen) {
      window.open(src, "_blank", "noopener,noreferrer");
      return;
    }

    activate();
    // Rejects on its own if the gesture isn't trusted — nothing to
    // recover from, the tour just stays inline.
    el.requestFullscreen().catch(() => {});
  }, [activate, src]);

  return (
    <div
      ref={wrapperRef}
      className={`group relative h-full w-full overflow-hidden bg-background-alt ${className}`}
    >
      {poster ? (
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes={posterSizes}
          aria-hidden={posterAlt ? undefined : "true"}
          className={`object-cover transition-opacity duration-700 ${
            isReady ? "opacity-0" : "opacity-60"
          }`}
        />
      ) : null}

      {isMounted ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsReady(true)}
          // Keyboard focus follows the shield: an inert frame shouldn't
          // be a tab stop, or keyboard users land inside a tour they
          // have no way to drive yet.
          tabIndex={isActive ? 0 : -1}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ pointerEvents: isActive ? "auto" : "none" }}
        />
      ) : null}

      {/* Loading state — only between "we mounted it" and "it painted". */}
      {isMounted && !isReady ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-black/50 pb-8">
          <span className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            Loading the tour
          </span>
        </div>
      ) : null}

      {/* The shield. A real <button>, so it's reachable by keyboard and
          announces itself, rather than a div with a click handler. */}
      {!isActive ? (
        <button
          type="button"
          onClick={activate}
          className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/55 px-6 text-center transition-colors duration-300 hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-black/60 text-accent transition-transform duration-300 group-hover:scale-110">
            <Move3D className="h-7 w-7" />
          </span>
          <span className="font-heading text-3xl font-semibold uppercase leading-none text-foreground sm:text-4xl">
            {prompt}
          </span>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            {hint}
          </span>
        </button>
      ) : (
        // Controls only exist while the tour has the pointer — before
        // that the shield owns the whole surface and a button floating
        // over it would just be a second, competing target.
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={
              isFullscreen ? "Exit fullscreen" : "View tour fullscreen"
            }
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-accent/70 bg-black/70 text-accent backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </button>

          {!isFullscreen ? (
            <button
              type="button"
              onClick={() => setIsActive(false)}
              className="flex h-9 cursor-pointer items-center gap-1.5 border border-foreground/30 bg-black/70 px-3 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted backdrop-blur-sm transition-colors hover:border-foreground/60 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Exit
              <span className="hidden sm:inline">(Esc)</span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
