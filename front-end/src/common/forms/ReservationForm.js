import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({
  type,
  reservation,
  setReservation,
  handleSubmit,
}) {
  const history = useHistory();

  // define options for number of people
  // const numberOfPeople = ["1", "2", "3", "4", "5", "6"];
  // const peopleOptions = numberOfPeople.map((people) => (
  //   <option>{people}</option>
  // ));

  // on change:
  const handleChange = ({ target }) => {
    // replace current value with input
    target.name === "people" && target.value >= 1
      ? setReservation({ ...reservation, [target.name]: Number(target.value) })
      : setReservation({ ...reservation, [target.name]: target.value });
  };

  return (
    <div className="d-flex flex-column align-items-center">

        <h2 className="my-3">{type} Reservation</h2>

    <div className="card p-4 mt-2">
    <form
      onSubmit={handleSubmit}
    >
      <div className="form-row">
        <div className="form-group col-4">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={reservation.first_name}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={reservation.last_name}
            onChange={handleChange}
            placeholder="Smith"
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            value={reservation.mobile_number}
            onChange={handleChange}
            placeholder="000-000-0000"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-4">
          <label htmlFor="people">Number of People</label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            value={reservation.people}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="reservation_date">Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            value={reservation.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="reservation_time">Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            value={reservation.reservation_time}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary w-75">
          Submit
        </button>
      </div>
    </form>
    </div>
    <button type="button" onClick={() => history.goBack()}>Cancel</button>
    </div>
  );
}
