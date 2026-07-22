"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, Phone, Clock, ParkingCircle } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedVariants,
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";

import businessInformation from "@/data/business-info";

// Leaflet touches window directly — must be loaded client-only,
// never during server-side rendering, or it throws.
const InteractiveMap = dynamic(
  () => import("@/components/utils/InteractiveMap"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
  },
);

const LOCATION = {
  latitude: 42.0999464,
  longitude: -87.9592789,
  address: businessInformation.address,
  googleMapsAddressLocation: businessInformation.googleMapAddressLocation,
  phone: businessInformation.phone,
  telephone: businessInformation.telephone,
  hours: "Mon – Thu: 11AM – 12AM\nFri – Sun: 11AM – 12AM",
  parking: "Free Parking Available",
};
export default function LocationSection() {
  const prefersReducedMotion = useReducedMotion();
  const v = (full) => (prefersReducedMotion ? reducedVariants : full);

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
      <Container className="relative">
        {/* Left — address, phone, hours, parking */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div className="z-1 flex flex-col gap-4">
            <div>
              <Subheading>Location</Subheading>
              <DividerFlourish className="mx-0 mt-2 w-20" />
            </div>
            <ul className="flex flex-col gap-3 text-sm text-foreground-muted sm:text-base">
              <li>
                <motion.div variants={v(headerVariants)}>
                  <a
                    href={LOCATION.googleMapsAddressLocation}
                    className="flex items-center gap-3 hover:scale-110 hover:text-foreground duration-200"
                  >
                    <MapPin className="mt-0.5 h-10 w-10 shrink-0 text-accent" />
                    <Title>{LOCATION.address}</Title>
                  </a>
                </motion.div>
              </li>
              <li>
                <motion.div variants={v(headerVariants)}>
                  <a
                    href={`tel:${LOCATION.telephone}`}
                    className="flex items-center gap-3 hover:scale-110 hover:text-foreground duration-200"
                  >
                    <Phone className="h-10 w-10 shrink-0 text-accent" />
                    <Title> {LOCATION.phone}</Title>
                  </a>
                </motion.div>
              </li>
              <li>
                <motion.div
                  variants={v(headerVariants)}
                  className="flex items-start gap-3 whitespace-pre-line"
                >
                  <Clock className="mt-0.5 h-10 w-10 shrink-0 text-accent" />
                  <Title> {LOCATION.hours}</Title>
                </motion.div>
              </li>
              <li>
                <motion.div
                  variants={v(headerVariants)}
                  className="flex items-center gap-3"
                >
                  <ParkingCircle className="h-10 w-10 shrink-0 text-accent" />
                  <Title> {LOCATION.parking}</Title>
                </motion.div>
              </li>
            </ul>
            <motion.div variants={v(buttonVariants)}>
              <RibbonButton
                href={businessInformation.googleMapAddressLocation}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </RibbonButton>
            </motion.div>
          </div>
          {/* Right — interactive map + Get Directions */}
          <motion.div
            variants={v(itemVariants)}
            className="relative aspect-4/3 w-full overflow-hidden shadow-lg"
          >
            <InteractiveMap
              latitude={LOCATION.latitude}
              longitude={LOCATION.longitude}
              name="Home Sports Bar"
              address={LOCATION.address}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
