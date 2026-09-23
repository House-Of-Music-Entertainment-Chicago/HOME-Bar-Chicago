import HeroSection from "@/components/pages/home/HeroSection";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import FeaturedMenuSection from "@/components/pages/home/FeaturedMenuSection";
import CTASection from "@/components/pages/home/CTASection";
import TestimonialSection from "@/components/pages/home/TestimonialSection/TestimonialSection";

export const metadata = {
  title: "Home",
  description:
    "HOME Sports Bar is a premier sports bar and entertainment venue in the northwest suburbs of Chicago. Cold drinks, great food, live music, and every game on wall-to-wall HD screens.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedMenuSection />
      <CTASection />
      <TestimonialSection />
    </>
  );
}
