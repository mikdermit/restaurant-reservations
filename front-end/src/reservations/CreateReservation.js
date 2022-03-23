import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../common/forms/ReservationForm";
import { today, formatAsPhoneNumber } from "../utils/date-time";

export default function CreateReservation() {
  const history = useHistory();
  const date = today();
  // define default form state
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "10:30",
    people: 0,
  };
  // declare states and errors
  const [reservation, setReservation] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  // on submit do:
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    // format phone number
    reservation.mobile_number = formatAsPhoneNumber(reservation.mobile_number)
    // create reservation
    createReservation(reservation, controller.signal)
      // redirect to reservation date's dashboard
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setError);
    return () => controller.abort();
  };

  // display error if any
  return (
    <>
      {error ? <ErrorAlert error={error} /> : null}
      <div className="d-flex flex-column align-items-center">
        <ReservationForm
          type="Create"
          reservation={reservation}
          setReservation={setReservation}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
