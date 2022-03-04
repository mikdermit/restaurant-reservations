import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { readReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  // get reservationId from URL
  const { reservationId } = useParams();
  // declare states and errors
  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null);
  // load reservation each time reservationId changes
  useEffect(() => {
    const controller = new AbortController();

    readReservation(reservationId, controller.signal)
      .then(setReservation)
      .catch(setError);

    return () => controller.abort();
  }, [reservationId]);

  return !reservation ? (
    <h1>loading</h1>
  ) : (
    <ReservationForm
      reservation={reservation}
      setReservation={setReservation}
    />
  );
}
