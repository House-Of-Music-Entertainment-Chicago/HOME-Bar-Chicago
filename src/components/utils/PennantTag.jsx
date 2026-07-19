import Image from "next/image";

export default function PennantTag({
  children,
  className = "",
  ribbonImage = "",
}) {
  return (
    <span
      className={`relative inline-block -rotate-2 ${className}`}
      style={{
        filter:
          "drop-shadow(3px 3px 0 rgba(0,0,0,0.9)) drop-shadow(5px 5px 0 rgba(0,0,0,0.35))",
      }}
    >
      <span className="relative flex items-center overflow-hidden whitespace-nowrap px-15 py-3">
        {/* Background photo — fills the pennant silhouette */}
        <Image
          src={ribbonImage}
          alt="Pennant tag image"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          priority={false}
          aria-hidden="true"
          className="object-cover"
        />

        {/* Text — sits above the photo + overlay */}
        <h3 className="relative z-10 font-heading text-2xl font-bold italic uppercase tracking-wide text-foreground drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] lg:text-4xl">
          {children}
        </h3>
      </span>
    </span>
  );
}
