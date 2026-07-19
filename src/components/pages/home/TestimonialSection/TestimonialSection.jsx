import Image from "next/image";
import PennantTag from "@/components/utils/PennantTag";
import TestimonialCard from "./TestimonialCard";
import ribbonOrange from "../../../../../public/images/assets/ribbon-orange.png";
import Container from "@/components/utils/Container";
import SOCIAL_LINKS from "@/data/social-links";

import InstagramEmbed from "./InstagramEmbed";

/**
 * TestimonialsAndSocialSection
 * ---------------------------------------------------------------
 * Left: "WHAT PEOPLE ARE SAYING" pennant (solid variant, not
 * photo-filled) + two testimonial cards side by side.
 * Right: "#HOMEBAR" callout + a strip of photos.
 *
 * `photos` can be fed either static-imported images, OR the
 * results of getLatestInstagramPosts() from lib/instagram.js
 * (built earlier in this project) if you want this strip to stay
 * live-updated from the real feed instead of curated manually.
 * ---------------------------------------------------------------
 */

const TESTIMONIALS = [
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark D.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine P.",
  },
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark Ds.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine Ps.",
  },
  {
    rating: 5,
    quote: "Best place to watch UFC! Great food, cold beer and amazing vibe.",
    name: "Mark Dsr.",
  },
  {
    rating: 5,
    quote: "Live bands are always on point. Feels like home every time.",
    name: "Jasmine Psr.",
  },
];

export default function TestimonialSection({
  instagramPostUrl = "https://www.instagram.com/p/DaOaojUxaQg/",
}) {
  return (
    <section className="bg-background-alt">
      <Container>
        <div className="container mx-auto flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Left — testimonials */}
          <div className="relative flex-1 p-5">
            <div className="absolute -top-20 -left-5 z-10">
              <PennantTag ribbonImage={ribbonOrange}>
                What People Are Saying
              </PennantTag>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:gap-10 sm:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Right — social callout + embedded IG post */}
          {/* <div className="flex flex-1 items-center gap-6"> */}
          <div className="relative flex flex-1 flex-col items-center lg:flex-row lg:justify-center">
            <div className="shrink-0 text-center lg:text-left lg:-rotate-90">
              <p className="font-display text-2xl font-black italic text-accent sm:text-3xl">
                #HomeBar
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                Follow us
                <br />
              </p>
              {/* <div className="flex items-center justify-center gap-4 mt-2">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-foreground-muted transition-colors hover:text-accent"
                  >
                    <Icon className="h-8 w-8" />
                  </a>
                ))}
              </div> */}
            </div>
            <InstagramEmbed
              url={instagramPostUrl}
              className="w-full sm:max-w-xs"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
