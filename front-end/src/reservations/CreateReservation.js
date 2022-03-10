import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    // create reservation
    createReservation(reservation);
    // redirect to reservation date's dashboard
    history.push(`/dashboard?date=${reservation.reservation_date}`);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
