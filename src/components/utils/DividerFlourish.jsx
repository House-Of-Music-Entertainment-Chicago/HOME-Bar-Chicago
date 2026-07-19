import Image from "next/image";

export default function DividerFlourish({ className = "" }) {
  return (
    <div className={`relative mx-auto aspect-6/1 w-40 ${className}`}>
      <Image
        src="/images/assets/flourish.png"
        alt="flourish divider"
        fill
        sizes="160px"
        priority={false}
        className="object-contain select-none pointer-events-none"
      />
    </div>
  );
}
