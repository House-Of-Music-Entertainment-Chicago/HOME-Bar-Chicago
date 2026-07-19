"use client";

import { useEffect } from "react";

// Module-level, shared across every component that imports this hook.
let lockCount = 0;

/**
 * useBodyScrollLock(locked)
 * ---------------------------------------------------------------
 * Reference-counted body-scroll lock, safe to call from multiple
 * independent components at once (IntroSplash, the mobile nav
 * menu, future modals, etc.).
 *
 * Why this replaces "capture previousOverflow, restore it later":
 * that pattern only works if exactly one thing ever touches
 * document.body.style.overflow. The moment two components do (as
 * IntroSplash and Navbar both were here), whichever one captures
 * the OTHER's mid-flight value as its own "previous" state can
 * permanently corrupt the restore — which is exactly what was
 * happening: Navbar's mount-time effect could capture IntroSplash's
 * "hidden" as its own baseline and write it right back.
 *
 * With a counter, mount order never matters: overflow is only ever
 * set to "hidden" when the count goes 0 -> 1, and only ever cleared
 * when it goes 1 -> 0. A component that never actually locks (e.g.
 * Navbar when the mobile menu is never opened) never touches the
 * counter at all, so it can't interfere with anything.
 * ---------------------------------------------------------------
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    if (lockCount === 1) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [locked]);
}
