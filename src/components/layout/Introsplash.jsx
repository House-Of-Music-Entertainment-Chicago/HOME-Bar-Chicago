"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "../../../public/images/logo/logo-shield.png";
import { useBodyScrollLock } from "@/app/hooks/UseBodyScrollLock";

/**
 * IntroSplash
 * ---------------------------------------------------------------
 * Mount ONCE at the true root layout, above/around {children}.
 * Plays on every full page load (module state resets on reload,
 * so `show` naturally starts `true` again) — but since this
 * component itself never remounts on client-side <Link> navigation
 * within the app, it correctly never replays mid-session.
 *
 * Fixes vs. the original version:
 *  - Scroll lock/unlock goes through a shared, reference-counted
 *    hook (useBodyScrollLock) instead of writing
 *    document.body.style.overflow directly, so it can never race
 *    with Navbar's mobile-menu lock over the same style property.
 *  - hasStartedRef guards against the effect firing a second time
 *    if `prefersReducedMotion` resolves to its real value slightly
 *    after mount (a known one-render-late behavior of the hook).
 * ---------------------------------------------------------------
 */

const HOLD_MS = 300;

export default function IntroSplash() {
  const [show, setShow] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const hasStartedRef = useRef(false);

  const logoInDuration = prefersReducedMotion ? 0.01 : 0.7;
  const exitDuration = prefersReducedMotion ? 0.01 : 0.6;

  // Locking/unlocking goes through the shared, reference-counted
  // hook (see hooks/useBodyScrollLock.js) instead of writing
  // document.body.style.overflow directly — this is what makes it
  // impossible for IntroSplash and Navbar's mobile menu to race
  // each other over the same style property.
  useBodyScrollLock(show);

  useEffect(() => {
    if (!show || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const holdMs = prefersReducedMotion ? 0 : HOLD_MS;
    const timer = setTimeout(
      () => {
        setShow(false);
      },
      logoInDuration * 1000 + holdMs,
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-999999 flex items-center justify-center bg-background"
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: exitDuration, ease: "easeIn" }}
        >
          <motion.div
            className="relative w-64 md:w-100"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : {
                    duration: logoInDuration,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }
            }
          >
            <Image
              src={logo}
              alt="Home Bar Chicago"
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
