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
    <div className="relative flex w-full flex-col items-center justify-center py-6">
      {/* Background — vintage paper photo, its own torn shape comes
          from the image's alpha channel now, not a clip-path */}
      <Image
        src={vintagePaper}
        alt="Vintage slightly torn paper"
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
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
