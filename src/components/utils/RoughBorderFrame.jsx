/**
 * RoughBorderFrame
 * ---------------------------------------------------------------
 * An irregular, hand-drawn-looking rectangle outline — NOT a plain
 * CSS `border` (which would look too clean/mechanical for this
 * "brushed olive marker" look in the mockup). Built as an SVG path
 * through a fixed set of jittered points (deliberately NOT
 * Math.random — same reasoning as EventCardGrid's rotation pattern
 * earlier in this build: random values would cause a Next.js
 * server/client hydration mismatch, since the server and client
 * would each generate different jitter).
 *
 * Renders as an absolutely-positioned overlay — place it as a
 * sibling to your photo, both inside a `relative` wrapper, and it
 * frames whatever's beneath it. Two overlaid strokes (a darker
 * base + a lighter offset one) give it a bit of painterly texture
 * depth rather than a single flat line.
 *
 * Usage:
 *   <div className="relative">
 *     <Image src={photo} fill className="object-cover" />
 *     <RoughBorderFrame />
 *   </div>
 * ---------------------------------------------------------------
 */

const OUTER_PATH =
  "M2,4 L18,1 L34,3 L50,1 L66,3 L82,1 L98,3 " +
  "L99,18 L97,34 L100,50 L98,66 L99,82 L97,98 " +
  "L82,99 L66,97 L50,100 L34,98 L18,99 L2,97 " +
  "L1,82 L3,66 L0,50 L2,34 L1,18 Z";

const INNER_PATH =
  "M3,5 L17,2.5 L33,4 L50,2.5 L65,4 L81,2 L97,4 " +
  "L98,17 L96,33 L99,50 L97,65 L98,81 L96,97 " +
  "L81,98 L65,96 L50,99 L33,97 L17,98 L3,96 " +
  "L2,81 L4,65 L1,50 L3,33 L2,17 Z";

export default function RoughBorderFrame({ className = "", color = "olive" }) {
  const strokeColor = color === "olive" ? "var(--color-olive)" : color;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path
        d={OUTER_PATH}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={INNER_PATH}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
