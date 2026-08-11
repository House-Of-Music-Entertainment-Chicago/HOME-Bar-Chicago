import React from "react";
import EventsHero from "@/components/pages/events/EventsHeroSection";
import ThisWeekStrip from "@/components/pages/events/ThisWeeksTripSection";
import FeaturedEventsSection from "@/components/pages/events/FeaturedEventsSection";
import UpcomingSpecialEventsSection from "@/components/pages/events/UpcomingSpeialEventSection";
import EventGallerySection from "@/components/pages/events/EventGallerySection";
import HostEventSection from "@/components/pages/events/HostEventSection";
import CTASection from "@/components/pages/home/CTASection";

import { getThisWeekEvents } from "@/lib/getThisWeekEvents";
import { getFeaturedEvents } from "@/lib/getFeaturedEvents";
import { getUpcomingSpecialEvents } from "@/lib/getUpcomingSpecialEvents";
import { getEventGalleryImages } from "@/lib/getEventsGallery";

export const revalidate = false; // controlled by webhook instead of a timer

export const metadata = {
  title: "Events",
  description:
    "See what's happening this week at HOME — live music, UFC watch parties, karaoke, and upcoming special events.",
  alternates: { canonical: "/events" },
};

export default async function Events() {
  const events = await getThisWeekEvents();
  // const featuredEvents = await getFeaturedEvents();
  // const upcomingSpecialEvents = await getUpcomingSpecialEvents();
  const eventGalleryImages = await getEventGalleryImages();

  return (
    <>
      <EventsHero />
      <ThisWeekStrip events={events} />
      {/* <FeaturedEventsSection events={featuredEvents.reverse()} />
      <UpcomingSpecialEventsSection events={upcomingSpecialEvents.reverse()} /> */}
      <EventGallerySection images={eventGalleryImages} />
      <HostEventSection />
      <CTASection />
    </>
  );
}
