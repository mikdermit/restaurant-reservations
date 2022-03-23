import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "./display/ReservationTable";

export default function SearchReservationsForm() {
  // declare states and errors
  const [mobileNumber, setMobileNumber] = useState("");
  const [foundReservations, setFoundReservations] = useState([]);
  const [error, setError] = useState(null);

  // on change:
  const handleChange = (event) => {
    // replace current value with input
    setMobileNumber(event.target.value);
  };

  // on submit do:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const controller = new AbortController();
    // get reservations matching mobile number
    listReservations({ mobile_number: mobileNumber }, controller.signal)
      .then(setFoundReservations)
      .catch(setError);
    console.log(foundReservations);
    return () => controller.abort();
  };

  // display error if any
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Search</h1>
      <div className="input-group justify-content-center">
        <input
          className="form-control col-9 my-3"
          type="text"
          name="mobile_number"
          id="mobile_number"
          placeholder="Enter a phone number"
          onChange={handleChange}
          value={mobileNumber}
        />
        <button
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleSubmit}
        >
          Find
        </button>
      </div>

      <ErrorAlert error={error} />
      <ReservationTable reservations={foundReservations} />
      {foundReservations.length === 0 ? <h6>No reservations found</h6> : null}
    </div>
  );
}
