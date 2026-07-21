import Image from "next/image";

// /**
//  * EventCard
//  * ---------------------------------------------------------------
//  * One "Instagram post"-style tile: image on a textured backdrop
//  * (your brick frame asset goes behind it via the `frameSrc`/bg, or
//  * just style the wrapper directly if the brick texture is already
//  * baked into your section background), with a small avatar +
//  * username overlay in the top-left corner, matching the mockup.
//  *
//  * Rotation and any vertical offset are intentionally left OUT of
//  * this component — that's handled by the parent EventCardGrid, so
//  * a single card stays simple/reusable and the "scattered" look is
//  * controlled in one place.
//  * ---------------------------------------------------------------
//  */

export default function EventCard({ image, alt = "", bgImage, bgAlt = "" }) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden bg-surface shadow-lg">
      {/* Background image — fills the whole card, acts as the "frame" */}
      <Image
        src={bgImage}
        alt={bgAlt}
        fill
        sizes="(min-width: 1280px) 50vw, 100vw"
        className="object-cover"
      />

      {/* Foreground photo — inset from the edges so the background
          peeks through around it like a border */}
      <div className="absolute inset-3 lg:inset-5 z-10 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
