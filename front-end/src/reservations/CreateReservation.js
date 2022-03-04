import React, { useState} from "react";
import { useHistory } from "react-router-dom"
import { createReservation } from "../utils/api"
import ReservationForm from "./ReservationForm";

export default function CreateReservation({ loadReservations }) {
const history = useHistory()
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservations_time: "",
    people: 0,
  };
  // declare states and errors
  const [reservation, setReservation] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    createReservation(reservation)
    .then(loadReservations)
    
    history.push("/dashboard")
  }

  return (
    <ReservationForm
      reservation={reservation}
      setReservation={setReservation}
      handleSubmit={handleSubmit}
    />
  );
}
