"use client";

import Link from "next/link";
import Image from "next/image";
import ribbonLime from "../../../public/images/assets/ribbon-lime.png"; // TODO: swap for your actual photo path

/**
 * RibbonButton
 * ---------------------------------------------------------------
 * Same torn-edge clip-path silhouette as before, now with a real
 * photo as the fill instead of a CSS gradient.
 *
 * Key detail: clip-path on a parent element clips everything
 * painted inside it — including an absolutely-positioned child
 * image — the same way overflow:hidden would, just shaped to the
 * exact torn silhouette instead of a rectangle. So the photo can
 * sit as a plain absolute-fill child of the already-clipped span;
 * it inherits the torn shape for free, no separate mask needed.
 * ---------------------------------------------------------------
 */

export default function RibbonButton({
  children,
  href,
  target = "_blank",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const face = (
    <span
      className="relative inline-block -rotate-2 transition-transform duration-200 hover:-rotate-1 hover:scale-[1.03] font-heading text-2xl lg:text-4xl font-semibold uppercase"
      style={{
        filter:
          "drop-shadow(4px 4px 0 rgba(0,0,0,0.9)) drop-shadow(7px 7px 0 rgba(0,0,0,0.35))",
      }}
    >
      <span className="relative flex items-center justify-center overflow-hidden whitespace-nowrap px-15 py-3">
        {/* Background photo — fills the torn silhouette */}
        <Image
          src={ribbonLime}
          alt="Pennant"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          priority={false}
          aria-hidden="true"
          className="object-cover"
        />

        {/* Text — sits above the photo + overlay */}
        <span className="ribbon-beat relative z-10 font-display italic tracking-wide text-background drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {children}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        onClick={onClick}
        className={`inline-block ${className}`}
      >
        {face}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
    >
      {face}
    </button>
  );
}
