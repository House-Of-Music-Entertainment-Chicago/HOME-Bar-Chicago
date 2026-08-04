/**
 * ShieldNotch
 * ---------------------------------------------------------------
 * The white chevron edge that traces the bottom of a hero section,
 * echoing the downward point of the HOME logo's shield.
 *
 * It is only the *border*. The shape itself comes from
 * `.shield-notch-bottom` (globals.css), so a hero needs three things:
 *
 *   1. `shield-notch-bottom` + `z-10` on the <section>
 *   2. <ShieldNotch /> as the last child of that <section>
 *   3. `shield-notch-join` on the NEXT section, so it slides up and
 *      fills the two triangles the clip removes
 *
 * Why the stroke is doubled: the path runs corner -> apex -> corner,
 * i.e. exactly the clip boundary, so the clip eats its outer half.
 * strokeWidth={6} therefore renders as roughly 3px. Deriving the border
 * from the same geometry as the clip is deliberate — it means the two
 * can never drift apart if --shield-notch changes.
 *
 * preserveAspectRatio="none" lets the 100x10 viewBox stretch to any
 * width; vector-effect keeps the line an even thickness instead of
 * stretching with it.
 * ---------------------------------------------------------------
 */
export default function ShieldNotch({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-(--shield-notch) w-full ${className}`}
    >
      <path
        d="M0 0 L50 10 L100 0"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="12"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
