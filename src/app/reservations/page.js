import React from "react";
import TableReservationSection from "@/components/pages/reservations/ReservationSection";
import LocationSection from "@/components/pages/reservations/LocationSection";
import PrivateEventSection from "@/components/pages/reservations/PrivateEventSection";

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
