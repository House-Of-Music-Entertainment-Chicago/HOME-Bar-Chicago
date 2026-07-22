// components/utils/AnimatedCounter.jsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

export default function AnimatedCounter({ value, className, duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Splits "15+" -> number: 15, suffix: "+"
  const match = String(value).match(/^(\d+)(.*)$/);
  const number = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;
    const node = ref.current;

    const controls = animate(0, number, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (node) node.textContent = Math.round(latest) + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, number, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
