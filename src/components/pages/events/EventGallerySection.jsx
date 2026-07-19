import Subheading from "@/components/utils/SubHeadingText";
import PaperDivider from "@/components/utils/PaperDivider";
import ImagePlaceholder from "@/components/utils/ImagePlaceholder";

const GALLERY_COUNT = 6;

export default function EventGallerySection() {
  return (
    <section className="py-5 relative bg-background">
      <Subheading className="text-center">Event Gallery</Subheading>

      <div className="flex gap-1 overflow-x-auto px-6 sm:grid sm:grid-cols-6 sm:gap-2 sm:overflow-visible sm:px-0">
        {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
          <div key={i} className="aspect-square w-40 shrink-0 sm:w-full">
            <ImagePlaceholder label="Gallery photo" className="h-full w-full" />
          </div>
        ))}
      </div>

      <PaperDivider position="bottom" />
    </section>
  );
}
