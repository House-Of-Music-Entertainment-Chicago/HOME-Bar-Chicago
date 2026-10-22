"use client";

import Image from "next/image";
import { wixImageLoader, wixBlurUrl } from "@/lib/wixImage";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Where each print sits at rest, and how it moves when the card (a parent
// `group`) is hovered or focused. The back two fan out, the front one
// lifts and straightens. motion-safe: a visitor who asked for reduced
// motion gets the stack at rest.
const POSES = [
  // front
  `z-30 inset-[4%] rotate-[-1.5deg] motion-safe:group-hover:-translate-y-[3%] motion-safe:group-hover:rotate-0 motion-safe:group-focus-visible:-translate-y-[3%] motion-safe:group-focus-visible:rotate-0`,
  // back left: same size as the front, offset and turned so its corners
  // show around the cover at rest
  `z-20 inset-[4%] -translate-x-[3%] rotate-[-6deg] motion-safe:group-hover:-translate-x-[8%] motion-safe:group-hover:rotate-[-10deg] motion-safe:group-focus-visible:-translate-x-[8%] motion-safe:group-focus-visible:rotate-[-10deg]`,
  // back right
  `z-10 inset-[4%] translate-x-[3%] rotate-[4.5deg] motion-safe:group-hover:translate-x-[8%] motion-safe:group-hover:rotate-[8deg] motion-safe:group-focus-visible:translate-x-[8%] motion-safe:group-focus-visible:rotate-[8deg]`,
];

/**
 * An album drawn as a small stack of photo prints: the cover on top of two
 * more of the album's photos, each with a paper border. The prints are the
 * album's own pictures, so the card says "album" with its real content
 * rather than with decoration. Albums with fewer than three photos show
 * blank paper behind the cover.
 */
export default function StackedPrints({ prints, sizes, priority = false, className = "" }) {
  return (
    <div className={`relative aspect-4/3 w-full ${className}`}>
      {POSES.map((pose, i) => {
        const print = prints[i];
        return (
          <div
            key={i}
            aria-hidden={i > 0 ? "true" : undefined}
            className={`absolute bg-paper p-[2.5%] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.85)] transition-transform duration-500 ${EASE} ${pose}`}
          >
            <div
              className="relative h-full w-full overflow-hidden bg-paper-foreground/15 bg-cover bg-center"
              style={
                print
                  ? { backgroundImage: `url("${wixBlurUrl(print.src, 4 / 3)}")` }
                  : undefined
              }
            >
              {print && (
                <Image
                  loader={wixImageLoader}
                  src={print.src}
                  alt={i === 0 ? print.alt : ""}
                  fill
                  sizes={sizes}
                  priority={priority && i === 0}
                  className="object-cover"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
