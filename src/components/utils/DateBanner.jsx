import Image from "next/image";
import Text from "./BodyText";

function DateBanner({ month, day, color = "olive" }) {
  return (
    <div
      className={`absolute left-0 top-0 flex flex-col items-center justify-center px-2 py-3 leading-none`}
    >
      <Image
        src={
          color === "olive"
            ? "/images/assets/date-banner-olive.png"
            : color === "orange"
              ? "/images/assets/date-banner-orange.png"
              : null
        }
        alt="Olive colored date banner"
        fill
        sizes="160px"
        priority
        className="object-cover z-0"
      />
      <Text className="z-1 uppercase">{month}</Text>
      <Text className="z-1">{day}</Text>
    </div>
  );
}

export default DateBanner;
