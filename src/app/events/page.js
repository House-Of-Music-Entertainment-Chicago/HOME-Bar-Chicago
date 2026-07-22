import React from "react";
import EventsHero from "@/components/pages/events/EventsHeroSection";
import ThisWeekStrip from "@/components/pages/events/ThisWeeksTripSection";
import FeaturedEventsSection from "@/components/pages/events/FeaturedEventsSection";
import UpcomingSpecialEventsSection from "@/components/pages/events/UpcomingSpeialEventSection";
import EventGallerySection from "@/components/pages/events/EventGallerySection";
import HostEventSection from "@/components/pages/events/HostEventSection";
import CTASection from "@/components/pages/home/CTASection";

export const metadata = {
  title: "Events",
  description:
    "See what's happening this week at HOME — trivia nights, live music, UFC watch parties, karaoke, and upcoming special events.",
  alternates: { canonical: "/events" },
};

function Events() {
  return (
    <>
      <EventsHero />
      <ThisWeekStrip />
      <FeaturedEventsSection />
      <UpcomingSpecialEventsSection />
      <EventGallerySection />
      <HostEventSection />
      <CTASection />
    </>
  );
}

export default Events;
