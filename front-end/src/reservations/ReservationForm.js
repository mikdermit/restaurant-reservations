import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getReservationById } from "../utils/api"
import { formatReservationDate } from "../utils/format-reservation-date"
import { today } from "../utils/date-time"

export default function ReservationForm() {
  const { reservation_id } = useParams();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservations_time: "",
    people: 0,
  };
  // declare states and errors
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null)

  // get reservation info if reservation id is present
  
  
  // define options for number of people
  const numberOfPeople = ["1", "2", "3", "4", "5", "6"];
  const peopleOptions = numberOfPeople.map((people) => (
    <option>{people}</option>
  ));
  // handle input change
  const handleChange = (({ target }) => {
    target.name === "people"
    ? setFormData({ ...formData, [target.name]: Number(target.value) })
    : setFormData({ ...formData, [target.name]: target.value })
  })

  function validateForm() {
    let valid = true
    const today = today()
  }

  return (
    <div class="d-flex justify-content-center">
      <form className="form w-50 mt-5">
        <div className="form-row">
          <div className="form-group col-4">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Smith"
              required
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="000-000-0000"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-4">
            <label htmlFor="people">Number of People</label>
            <select
              className="form-control"
              id="people"
              name="people"
              onChange={handleChange}
              required
            >
              <option>Select</option>
              {peopleOptions}
            </select>
          </div>
          <div className="form-group col-4">
            <label htmlFor="reservation_date">Date</label>
            <input
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="reservation_time">Time</label>
            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
