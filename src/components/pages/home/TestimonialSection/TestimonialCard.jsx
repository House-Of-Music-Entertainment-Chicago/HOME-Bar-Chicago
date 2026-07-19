import StarRating from "@/components/utils/StarRating";

/**
 * TestimonialCard
 * ---------------------------------------------------------------
 * One review block: stars, quote, and attribution.
 * ---------------------------------------------------------------
 */
export default function TestimonialCard({ rating = 5, quote, name }) {
  return (
    <div className="flex flex-col gap-2">
      <StarRating count={rating} />
      <p className="text-sm text-foreground-muted sm:text-base">{quote}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted/70">
        &mdash; {name}
      </p>
    </div>
  );
}
