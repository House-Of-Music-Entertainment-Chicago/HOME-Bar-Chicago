// hooks/useSafeVariants.js
"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { reducedVariants } from "@/data/animation-variants";

export function useSafeVariants() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The helper function to wrap your Framer Motion variants
  const v = (fullVariants) => {
    if (!mounted) return fullVariants; // Server render default
    return prefersReducedMotion ? reducedVariants : fullVariants;
  };

  return v;
}
