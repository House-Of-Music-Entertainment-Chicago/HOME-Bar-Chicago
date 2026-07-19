import React from "react";
import EventsHero from "@/components/pages/events/EventsHeroSection";
import ThisWeekStrip from "@/components/pages/events/ThisWeeksTripSection";
import FeaturedEventsSection from "@/components/pages/events/FeaturedEventsSection";
import WeeklyScheduleSection from "@/components/pages/events/WeeklyEventSchedule";
import UpcomingSpecialEventsSection from "@/components/pages/events/UpcomingSpeialEventSection";
import EventGallerySection from "@/components/pages/events/EventGallerySection";
import HostEventSection from "@/components/pages/events/HostEventSection";
import CTASection from "@/components/pages/home/CTASection";

function Events() {
  return (
    <>
      <EventsHero />
      <ThisWeekStrip />
      <FeaturedEventsSection />
      {/* <WeeklyScheduleSection /> */}
      <UpcomingSpecialEventsSection />
      <EventGallerySection />
      <HostEventSection />
      <CTASection />
    </>
  );
}

export default Events;
