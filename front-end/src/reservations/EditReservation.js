import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import LoadingMessage from "../layout/LoadingMessage";
import CancelButton from "../common/buttons/CancelButton";
import ReservationForm from "./ReservationForm";

export default function EditReservation({ setError }) {
  const history = useHistory();

  // get reservationId from URL
  const { reservationId } = useParams();

  // declare states and errors
  const [reservation, setReservation] = useState({});

  // when reservationId changes:
  useEffect(() => {
    const controller = new AbortController();
    // load reservation
    readReservation(reservationId, controller.signal)
      .then(setReservation)
      .catch(setError);

    return () => controller.abort();
  }, [reservationId]);

  // on submit:
  const handleSubmit = (event) => {
    event.preventDefault();
    const date = reservation.reservation_date;
    // update reservation
    updateReservation(reservation);
    // redirect to reservation date's dashboard
    history.push(`/dashboard/?date=${date}`);
  };

  // if no reservation return loading
  return !reservation ? (
    <LoadingMessage />
  ) : (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between w-50 my-3">
        <CancelButton reservationId={reservationId} />
      </div>
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
