import Image from "next/image";
import RoughBorderFrame from "../../../utils/RoughBorderFrame";

/**
 * StackedPhotoCard
 * ---------------------------------------------------------------
 * The "photo with an olive rough-border card stacked behind it,
 * slightly rotated" effect used on the Hero and Our Story images.
 *
 * Structure: a rotated olive-bordered "ghost" card sits behind the
 * actual photo (also olive-bordered), offset diagonally — same
 * layered-depth idea as RibbonButton's doubled drop-shadow, just
 * built from two real stacked elements instead of a CSS filter,
 * since here each "layer" needs its own independent rough border.
 * ---------------------------------------------------------------
 */
export default function StackedPhotoCard({ image, alt, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Ghost card behind — just the border, rotated, offset */}
      <div className="absolute -right-3 -top-3 h-full w-full rotate-3">
        <RoughBorderFrame />
      </div>

      {/* Actual photo, on top */}
      <div className="relative h-full w-full -rotate-1">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface text-xs text-foreground-muted">
            TODO: photo
          </div>
        )}
        <RoughBorderFrame />
      </div>
    </div>
  );
}
