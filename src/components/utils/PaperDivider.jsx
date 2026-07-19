import Image from "next/image";
import tornPaper from "../../../public/images/assets/divider-1.png";

/**
 * PaperDivider
 * ---------------------------------------------------------------
 * A torn-paper strip meant to sit ON TOP of the seam between two
 * stacked sections, overlapping into both of them so the tear
 * reads as a physical ripped edge rather than a flat line.
 *
 * How the overlap works:
 *   The parent section must be `relative` (or otherwise establish
 *   a positioning context). This component is `absolute`, pinned
 *   to either the bottom or top edge of that section, then nudged
 *   up/down by `overlap` so it straddles the seam — half sits over
 *   the current section's background, half spills into the next.
 *
 * Usage — divider between a dark section and the one below it:
 *
 *   <section className="relative bg-background">
 *     ...section content...
 *     <PaperDivider position="bottom" />
 *   </section>
 *   <section className="bg-surface">
 *     ...next section...
 *   </section>
 *
 * Flip it for the top of a section instead of the bottom:
 *   <PaperDivider position="top" flip />
 *
 * Props:
 *   position — "top" | "bottom" (default "bottom"): which edge of
 *              the parent section it clings to.
 *   flip     — mirrors the image vertically, for reusing the same
 *              asset at a top edge instead of a bottom edge.
 *   overlap  — how far it pushes past the seam, as a translate
 *              amount (default "50%" — straddles the line evenly).
 *   className — extra classes (e.g. to control height/z-index per use).
 * ---------------------------------------------------------------
 */

export default function PaperDivider({
  position = "bottom",
  flip = false,
  overlap = "50%",
  className = "",
}) {
  const edgeClass = position === "bottom" ? "bottom-0" : "top-0";
  const translateY =
    position === "bottom"
      ? `translateY(${overlap})`
      : `translateY(-${overlap})`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-20 w-full ${edgeClass} ${className}`}
      style={{
        transform: `${translateY}${flip ? " scaleY(-1)" : ""}`,
      }}
    >
      <Image
        src={tornPaper}
        alt="Torn paper divider"
        priority={false}
        className="h-auto w-full select-none"
      />
    </div>
  );
}
