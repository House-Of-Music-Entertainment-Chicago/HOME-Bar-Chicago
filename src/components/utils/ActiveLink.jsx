"use client";

import Link from "next/link";
import { useActivePath } from "@/components/hooks/useActivePath";

/**
 * A Link that knows whether it points at the current page.
 *
 * Exists so a server component (the Footer) can have active-aware links
 * without the whole component becoming a client component — only this
 * leaf crosses the boundary.
 *
 * Callers pass the styling for each state rather than having it baked in,
 * because the footer's nav list and its legal link look nothing alike.
 */
export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  ...rest
}) {
  const isActive = useActivePath();
  const active = isActive(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : inactiveClassName}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
