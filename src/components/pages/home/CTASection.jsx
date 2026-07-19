import Image from "next/image";
import Link from "next/link";
import Subheading from "@/components/utils/SubHeadingText";
import sectionBg1 from "../../../../public//images/assets/section-bg-1.jpg"; // TODO: swap for your real photo
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";

/**
 * ReserveTableSection
 * ---------------------------------------------------------------
 * The "GOOD NIGHTS START HERE." bar. Background is a real photo
 * (concrete/crowd texture) put through a duotone treatment:
 *
 *   1. `grayscale` filter strips the photo's own color, leaving
 *      just its luminance (light/dark texture, shapes, silhouettes).
 *   2. An olive-colored layer sits on top with
 *      `mix-blend-mode: multiply` — this recolors based on the
 *      photo's actual light/dark values instead of just sitting
 *      over it like a flat tinted pane of glass. Dark parts of the
 *      photo stay dark, light parts pick up the olive tone.
 *   3. A subtle dark gradient at the edges on top of THAT, purely
 *      for text legibility where the headline/button sit.
 *
 * If `multiply` ends up too dark/muddy once you see the real
 * photo, try swapping to `mix-blend-mode: color` instead — it
 * preserves the photo's original lightness more faithfully.
 * ---------------------------------------------------------------
 */

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-y-2 border-black/60">
      {/* Layer 1 — the photo, desaturated */}
      <Image
        src={sectionBg1}
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority={false}
        aria-hidden="true"
        className="object-cover grayscale contrast-125 brightness-200"
      />

      {/* Layer 2 — olive duotone tint, blended against the photo's
          luminance rather than flattening it */}
      <div
        className="absolute inset-0 bg-lime"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Layer 3 — light darkening at the edges so text stays legible
          regardless of what's directly behind it */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />

      <Container>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <Subheading className="leading-none tracking-wide w-[33%]">
            Good Nights
            <br />
            Start Here.
          </Subheading>
          <p className="max-w-xs text-2xl lg:text-4xl text-foreground font-body sm:w-[33%]">
            Reserve your table and let the good times roll.
          </p>
          <RibbonButton href="/reserve">Reserve a Table</RibbonButton>
        </div>
      </Container>
    </section>
  );
}

/**
 * ArrowButton
 * ---------------------------------------------------------------
 * The outlined pennant/arrow button on the right. Same single-notch
 * clip-path shape as PennantTag, but styled as a translucent
 * bordered button rather than a solid photo-filled tag — this one
 * is interactive (a real link), so it also gets hover states.
 * ---------------------------------------------------------------
 */
function ArrowButton({ href, children }) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center whitespace-nowrap border border-white/70 bg-black/30 py-3 pl-6 pr-9 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-black/50"
      style={{ clipPath: "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)" }}
    >
      {children}
    </Link>
  );
}
