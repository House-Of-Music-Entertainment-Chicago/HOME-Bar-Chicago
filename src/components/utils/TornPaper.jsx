import Image from "next/image";
import RibbonButton from "./Ribbonbutton";
import vintagePaper from "../../../public/images/assets/vintage-paper-bg.png";

function TornPaper({
  href = "",
  firstText = "",
  secondText = "",
  thirdText = "",
}) {
  return (
    // max-w-md is deliberate: vintage-paper-bg.png is only 415x463, so
    // letting this stretch to a full container width upscaled it ~3x and
    // it read as blurry/pixelated on large screens. Capping the banner
    // near the asset's native width keeps it crisp; raise this only if
    // the source image is re-exported at a higher resolution.
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center py-10">
      {/* Background — vintage paper photo, its own torn shape comes
          from the image's alpha channel now, not a clip-path */}
      <Image
        src={vintagePaper}
        alt="Vintage slightly torn paper"
        fill
        sizes="(min-width: 448px) 448px, 100vw"
        priority={false}
        aria-hidden="true"
        className="object-cover"
      />

      {/* Content — sits above the paper */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-5 text-center">
        <p className="font-heading uppercase text-paper-foreground font-semibold text-4xl sm:text-5xl">
          {firstText ?? "First Line Text"}
          <br />
          {secondText ?? "Second Line Text"}
          <br />
          <span className="text-accent text-3xl sm:text-4xl">
            {thirdText ?? "Third Line Text"}
          </span>
        </p>

        {href && (
          <RibbonButton href={href} className="scale-90">
            Explore the Menu
          </RibbonButton>
        )}
      </div>
    </div>
  );
}

export default TornPaper;
