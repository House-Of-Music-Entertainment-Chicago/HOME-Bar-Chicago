"use client";

import { usePathname } from "next/navigation";

/**
 * Returns a matcher for "is this nav link the page we're on?".
 *
 * Two details worth keeping:
 *
 *  - "/" is matched exactly. A plain startsWith would make Home active on
 *    every route, since every path starts with "/".
 *  - Other routes match themselves *or* a nested child, so a future
 *    /events/summer-fest still lights up the Events link. The `${href}/`
 *    boundary is what stops /menu from also matching a sibling like
 *    /menu-specials.
 */
export function useActivePath() {
  const pathname = usePathname();

  return function isActive(href) {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export default useActivePath;
