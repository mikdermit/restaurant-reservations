import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../common/forms/ReservationForm";

export default function EditReservation() {
  const history = useHistory();
  // get reservationId from URL
  const { reservation_id } = useParams();
  // declare states and errors
  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null);

  // get reservation when reservation_id changes
  useEffect(() => {
    const controller = new AbortController();
    // get reservation
    readReservation(reservation_id, controller.signal)
      // convert date
      .then((res) =>
        setReservation({
          ...res,
          reservation_date: new Date(res.reservation_date)
            .toISOString()
            .substr(0, 10),
        })
      )
      .catch(setError);
    return () => controller.abort();
  }, [reservation_id]);

  // on submit do:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const controller = new AbortController();
    const date = reservation.reservation_date;
    // update reservation
    updateReservation(reservation, controller.signal)
      // redirect to reservation date's dashboard
      .then(() => history.push(`/dashboard/?date=${date}`))
      .catch(setError);
    return () => controller.abort();
  };

  // display error if any
  return (
    <>
      {error ? <ErrorAlert error={error} /> : null}
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
