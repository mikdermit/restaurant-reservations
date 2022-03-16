import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert"

export default function CreateReservation() {
  const history = useHistory();

  // define default form state
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  // declare states and errors
  const [reservation, setReservation] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  // on submit:
  const handleSubmit = async (event) => {
    event.preventDefault();
    // create reservation
    createReservation(reservation)
    // redirect to reservation date's dashboard
     .then(() => history.push(`/dashboard?date=${reservation.reservation_date}`))
    .catch(setError)
  };

  return (
    <>
    {error ? (<ErrorAlert error={error} />) : null}
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
