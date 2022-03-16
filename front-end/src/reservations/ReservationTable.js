import React from "react";
import { Link } from "react-router-dom";
import SeatButton from "../common/buttons/SeatButton";
import Edit from "../images/edit.png";
import CancelReservationButton from "../common/buttons/CancelReservationButton"

export default function ReservationTable({ reservations }) {

  const handleClick = (target) => {
    reservations.find((reservation) => {
      if (reservation.reservation_id === target.reservation_id) {
        // assign table
      }
    });
  };
  const reservationList = reservations.map((reservation, count) => {
    return (
      <tr >
        <td scope="row" className="align-middle"><SeatButton reservation={reservation} /></td>
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
        <td><CancelReservationButton reservation={reservation}/></td>
      </tr>
    );
  });
  return (
    <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
            <th className="col-sm-1"></th>
            <th className="col-sm-1">Party</th>
              <th className="col-sm-2">Name</th>
              <th className="col-sm-2">Contact</th>
              <th className="col-sm-2">Date</th>
              <th className="col-sm-2">Time</th>
              <th className="col-sm-2">Status</th>
              <th className="col-sm-1"></th>
              <th className="col-sm-1"></th>
            </tr>
          </thead>
          <tbody>
          {reservationList}
          </tbody>
          </table>
  );
}
