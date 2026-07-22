import React from "react";
import TableReservationSection from "@/components/pages/reservations/ReservationSection";
import LocationSection from "@/components/pages/reservations/LocationSection";
import PrivateEventSection from "@/components/pages/reservations/PrivateEventSection";

export const metadata = {
  title: "Reservations",
  description:
    "Reserve your table at HOME Sports Bar, or inquire about hosting your next private event with us.",
  alternates: { canonical: "/reservations" },
};

function Reservations() {
  return (
    <>
      <TableReservationSection />
      <PrivateEventSection />
      <LocationSection />
    </>
  );
}

export default Reservations;
