import Image from "next/image";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";

const GALLERY_PHOTOS = [
  "/images/assets/entertainment/gallery-image1.jpg", // TODO: crowd photo
  "/images/assets/entertainment/gallery-image2.jpg", // TODO: wings/food photo
  "/images/assets/entertainment/gallery-image3.jpg", // TODO: bottles photo
  "/images/assets/entertainment/gallery-image4.jpg", // TODO: crowd/DJ photo
  "/images/assets/entertainment/gallery-image5.jpg", // TODO: burger photo
  "/images/assets/entertainment/gallery-image6.jpg", // TODO: toast/cheers photo
];

export default function GallerySection() {
  return (
    <section className="relative bg-background px-6 py-16">
      <Container>
        <div className="mb-10 flex flex-col items-center text-center">
          <Subheading>Gallery Preview</Subheading>
          <DividerFlourish className="mt-2 w-24" />
        </div>

        <div className="mb-10 grid grid-cols-3 sm:grid-cols-6">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-square w-full overflow-hidden rounded-sm"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt="HOME Bar gallery image"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface text-[10px] text-foreground-muted">
                  TODO
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <RibbonButton href="/events">View Upcoming Events</RibbonButton>
        </div>
      </Container>
    </section>
  );
}
