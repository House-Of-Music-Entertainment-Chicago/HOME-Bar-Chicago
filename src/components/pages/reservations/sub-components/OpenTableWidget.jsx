"use client";

import RibbonButton from "@/components/utils/Ribbonbutton";
/**
 * OpenTableWidget
 * ---------------------------------------------------------------
 * I can't fabricate your actual embed snippet — OpenTable generates
 * a restaurant-specific widget (tied to your unique Restaurant ID)
 * from YOUR OpenTable for Restaurants dashboard, under
 * Marketing > Widgets. There's no generic public API endpoint to
 * call instead; it's account-specific by design.
 *
 * To finish this:
 *   1. Log into OpenTable for Restaurants
 *   2. Go to Marketing > Widgets > Reservation Widget
 *   3. Copy the embed snippet they generate
 *   4. Replace the placeholder button below with that snippet
 *
 * Until then, this renders a working link straight to your
 * OpenTable booking page instead of a broken/empty embed — so the
 * button is never non-functional, just not the inline widget yet.
 * ---------------------------------------------------------------
 */

export default function OpenTableWidget({
  restaurantSlug = "REPLACE_WITH_YOUR_OPENTABLE_SLUG",
}) {
  return (
    <div className="flex flex-col gap-2">
      <RibbonButton
        href={`https://www.opentable.com/r/${restaurantSlug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Reserve with OpenTable
      </RibbonButton>
      <p className="flex items-center gap-1.5 text-xs text-foreground-muted">
        🔒 You will be redirected to OpenTable to complete your reservation.
      </p>
    </div>
  );
}
