import React from "react";
// import Edit from "../images/edit.png";
import ReservationRow from "./ReservationRow"


export default function ReservationTable({ reservations }) {
  const reservationList = reservations.map(reservation => (<ReservationRow key={reservation.reservation_id} reservation={reservation} />))
  return (
    <table className="table table-striped border text-center">
      <thead className="thead-dark">
        <tr>
          <th className="col-sm-1">Status</th>
          <th className="col-sm-1">ID</th>
          <th className="col-sm-2">Name</th>
          <th className="col-sm-2">Contact</th>
          <th className="col-sm-2">Date</th>
          <th className="col-sm-2">Time</th>
          <th className="col-sm-1">Party</th>
          <th className="col-sm-1"></th>
          <th className="col-sm-1"></th>
          <th className="col-sm-1"></th>
        </tr>
      </thead>
      <tbody>{reservationList}</tbody>
    </table>
  );
}
