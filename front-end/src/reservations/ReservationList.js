import React from "react";
import { Link } from "react-router-dom";
import SeatButton from "../common/buttons/SeatButton";
import Edit from "../images/edit.png";

export default function ReservationList({ reservations }) {
  let count = 0;
  const handleClick = (target) => {
    reservations.find((reservation) => {
      if (reservation.reservation_id === target.reservation_id) {
        // assign table
      }
    });
  };
  const reservationList = reservations.map((reservation, count) => {
    count++;

    return (
      <tr >
        <th scope="row" className="align-middle">{count}</th>
        <td className="align-middle"><SeatButton reservation={reservation} /></td>
        <th className="align-middle">{reservation.people}</th>
        <td className="align-middle">{reservation.first_name} {reservation.last_name}</td>
        <td className="align-middle">{reservation.mobile_number}</td>
        <td className="align-middle">{reservation.reservation_date}</td>
        <td className="align-middle">{reservation.reservation_time}</td>
        
        <td
          className={`align-middle ${
            reservation.status === "cancelled" ? "text-danger" : "text-success"
          }`}
        >
          {reservation.status}
        </td>
        <td className="align-middle">
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <img src={Edit} width="22" />
          </Link>
        </td>
      </tr>
    );
  });
  return reservationList;
}
