"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, Phone, Clock, ParkingCircle } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";
// Leaflet touches window directly — must be loaded client-only,
// never during server-side rendering, or it throws.
const InteractiveMap = dynamic(
  () => import("@/components/utils/InteractiveMap"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
  },
);
/**
 * LocationSection
 * ---------------------------------------------------------------
 * NOTE: latitude/longitude below are placeholders (Makati City
 * center) — replace with the business's actual coordinates. Get
 * them by right-clicking the real address in Google Maps and
 * copying the lat/lng shown, or via a geocoding API.
 * ---------------------------------------------------------------
 */
const LOCATION = {
  latitude: 14.5547,
  longitude: 121.0244,
  address: "123 Champions Ave, Makati City, Philippines",
  phone: "(02) 8123 4567",
  hours: "Mon – Thu: 4PM – 1AM\nFri – Sun: 12NN – 2AM",
};
export default function LocationSection() {
  return (
    <section className="relative bg-background">
      <Image
        src="/images/assets/section-bg-1.jpg"
        alt="Concrete background image"
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="absolute inset-0 z-0 object-cover"
      />
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Left — address, phone, hours, parking */}
        <div className="z-1 flex flex-col gap-4">
          <div>
            <Subheading>Location</Subheading>
            <DividerFlourish className="mx-0 mt-2 w-20" />
          </div>
          <ul className="flex flex-col gap-3 text-sm text-foreground-muted sm:text-base">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-10 w-10 shrink-0 text-accent" />
              <Title>{LOCATION.address}</Title>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-10 w-10 shrink-0 text-accent" />
              <Title> {LOCATION.phone}</Title>
            </li>
            <li className="flex items-start gap-3 whitespace-pre-line">
              <Clock className="mt-0.5 h-10 w-10 shrink-0 text-accent" />
              <Title> {LOCATION.hours}</Title>
            </li>
            <li className="flex items-center gap-3">
              <ParkingCircle className="h-10 w-10 shrink-0 text-accent" />
              <Title> Free Parking Available</Title>
            </li>
          </ul>
          <RibbonButton
            href={`https://www.google.com/maps/dir/?api=1&destination=${LOCATION.latitude},${LOCATION.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </RibbonButton>
        </div>
        {/* Right — interactive map + Get Directions */}
        <div className="relative aspect-4/3 w-full overflow-hidden shadow-lg">
          <InteractiveMap
            latitude={LOCATION.latitude}
            longitude={LOCATION.longitude}
            name="Home Sports Bar"
            address={LOCATION.address}
          />
        </div>
      </Container>
    </section>
  );
}
