import Image from "next/image";
import Text from "./BodyText";
import Title from "./TitleText";

/**
 * FeatureCard
 * ---------------------------------------------------------------
 * A photo tile with the glowing line-art icon sitting on top of it
 * as a centered badge, and the title/description overlaid at the
 * bottom on a dark gradient (so text stays legible regardless of
 * what's happening in the photo underneath).
 *
 * `image` should be a real photo relevant to that feature — e.g.
 * an actual burger off the menu for "Great Food", a shot of the
 * bar's TVs for "UFC & Sports", etc. — not a generic stock texture,
 * since the icon is meant to label a specific real thing shown
 * behind it.
 * ---------------------------------------------------------------
 */

export default function FeatureCard({ image, alt, Icon, title, description }) {
  return (
    <div className="group relative aspect-3/4 xl:aspect-square w-full overflow-hidden shadow-lg">
      {/* Photo */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Dark overlay — uniform dim so the icon reads clearly against
          any part of the photo, plus a stronger gradient at the
          bottom so the text has a guaranteed-dark backdrop even over
          a bright photo */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

      {/* Icon badge — sits on top of the photo */}
      <div className="absolute inset-0 flex items-center justify-center pb-10">
        <Icon className="h-12 w-12 text-accent filter-[drop-shadow(0_0_4px_var(--color-accent))_drop-shadow(0_0_10px_var(--color-accent))] sm:h-14 sm:w-14" />
      </div>

      {/* Title + description */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-3 pb-4 text-center">
        <Title className="uppercase">{title}</Title>
        <Text className="mt-1 max-w-[20ch] text-foreground-muted">
          {description}
        </Text>
      </div>
    </div>
  );
}
