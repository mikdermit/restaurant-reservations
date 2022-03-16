import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import LoadingMessage from "../layout/LoadingMessage";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert"

export default function EditReservation() {
  const history = useHistory();

  // get reservationId from URL
  const { reservationId } = useParams();

  // declare states and errors
  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null)

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = reservation.reservation_date;
    // update reservation
    updateReservation(reservation)
    // redirect to reservation date's dashboard
    .then(() => history.push(`/dashboard/?date=${date}`))
    .catch(setError)
  };

  // if no reservation return loading
  return (
  <>
    {error ? (<ErrorAlert error={error} />) : null}
    <div className="d-flex flex-column align-items-center">
      <ReservationForm
      type="Edit"
        reservation={reservation}
        setReservation={setReservation}
        handleSubmit={handleSubmit}
      />
    </div>
    </>
  );
}
