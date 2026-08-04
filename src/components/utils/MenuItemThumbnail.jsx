import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Photo block for a menu item row.
 *
 * Deliberately takes its width from the caller (`className`) rather
 * than defaulting to `w-full`: these lists render in 1-, 2-, and
 * 3-column layouts on the same page, so a single fixed size is either
 * cramped in a narrow column or enormous in a full-width row. Callers
 * pair a fluid width with a container-query width — see the `@xs:`
 * classes in FoodMenuSection / DrinksMenuSection.
 *
 * Falls back to ImagePlaceholder when the item has no real photo yet —
 * adding one later is just an `image` key on that item's data entry.
 */
export default function MenuItemThumbnail({
  image,
  alt,
  sizes = "(min-width: 640px) 256px, 90vw",
  className = "",
}) {
  return (
    <div
      className={`relative aspect-5/4 overflow-hidden rounded-sm ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder
          label="Photo coming soon"
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
