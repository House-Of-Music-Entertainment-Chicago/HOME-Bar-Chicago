"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// logo-shield.png is "Logo White.jpeg" with only the OUTER white flood-
// filled to transparent — the white *inside* the shield is deliberately
// kept, so the mark carries its own backing plate instead of letting
// whatever is behind it show through the badge.
import logo from "../../../public/images/logo/logo-shield.png";
import { useBodyScrollLock } from "@/app/hooks/UseBodyScrollLock";
import { useActivePath } from "@/components/hooks/useActivePath";

/**
 * Navbar
 * ---------------------------------------------------------------
 * - Logo is absolutely centered and sits slightly BELOW the bottom
 *   edge of the bar (like a badge poking out), on all breakpoints.
 * - Nav links split into a left group and a right group around the
 *   logo on desktop (md and up).
 * - Below md, links collapse into a hamburger on the RIGHT. Tapping
 *   it opens a dropdown panel that's positioned OUT OF FLOW
 *   (absolute, floating over the page) so it never pushes the
 *   page content down — it just overlays on top and disappears
 *   when closed or dismissed.
 * ---------------------------------------------------------------
 */

const LEFT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reservations", href: "/reservations" },
];

const RIGHT_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

/* Shared by both desktop groups so they can't drift apart.
   The bottom border is always rendered and merely transparent when
   inactive — toggling between "no border" and "border" would shift the
   link 2px every time you navigate. */
const desktopLinkClass = (active) =>
  [
    "font-heading text-sm lg:text-xl xl:text-3xl uppercase tracking-wide",
    "border-b-2 pb-0.5 transition-colors transition-transform duration-500",
    active
      ? "border-accent text-accent scale-120"
      : "border-transparent text-foreground hover:text-accent hover:scale-110",
  ].join(" ");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = useActivePath();

  // Close the mobile menu automatically if the viewport grows back
  // to desktop size while it's open.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Glassy/translucent once scrolled past the top; solid again the
  // moment we're back at the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu overlay is open — shared,
  // reference-counted lock so this can never fight with IntroSplash
  // (or any future modal) over document.body.style.overflow.
  useBodyScrollLock(open);

  return (
    // <header className="relative z-40 overflow-visible bg-background border-b border-foreground">
    // <header className="fixed top-0 left-0 z-40 w-full overflow-visible bg-background border-b border-foreground">
    <header
      className={`fixed top-0 left-0 z-99999 w-full overflow-visible border-b transition-colors duration-300 ${
        scrolled
          ? "border-foreground/20 bg-background/70 backdrop-blur-sm"
          : "border-foreground bg-background"
      }`}
    >
      <nav className="relative flex h-18 items-center justify-between px-4 md:px-8 container mx-auto">
        {/* Left group (desktop) */}
        <div className="hidden items-center gap-8 lg:flex">
          {LEFT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // aria-current is what actually tells a screen reader which
              // page this is; the colour alone conveys nothing to one.
              aria-current={isActive(link.href) ? "page" : undefined}
              className={desktopLinkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center logo — overlaps the bottom edge of the bar */}
        {/* The logo is the Home link, so it carries Home's active state.
            There's no room for a visual marker here without disturbing
            the badge, but aria-current still announces it. */}
        <Link
          href="/"
          className="absolute left-1/2 -top-3 z-50 -translate-x-1/2"
          aria-label="Home Bar Chicago — home"
          aria-current={isActive("/") ? "page" : undefined}
        >
          <div className="relative w-64 -translate-y-2">
            <Image
              src={logo}
              alt="Home Bar Chicago"
              priority
              className="h-auto w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            />
          </div>
        </Link>

        {/* Right group (desktop) */}
        <div className="hidden items-center gap-8 lg:flex">
          {RIGHT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={desktopLinkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
          {/* <button
            type="button"
            aria-label="Search"
            className="text-foreground transition-colors hover:text-accent"
          >
            <SearchIcon />
          </button> */}
        </div>

        {/* Hamburger (mobile only) — sits on the right, replacing the
            desktop right-group/search on small screens */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-200 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-200 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Backdrop — click outside the panel to close it */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile dropdown panel — OUT OF FLOW (absolute), floats over
          the page instead of pushing page content down. */}
      <div
        id="mobile-menu"
        className={`absolute left-0 top-full z-40 w-full origin-top border-b border-surface-border bg-background shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col divide-y divide-surface-border px-4">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              // A left rule rather than an underline here: these are
              // stacked rows separated by divide-y, so an underline would
              // read as a row separator. Transparent-when-inactive keeps
              // the label from shifting.
              className={`border-l-2 py-4 pl-3 font-display text-base uppercase tracking-wide transition-colors ${
                isActive(link.href)
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
