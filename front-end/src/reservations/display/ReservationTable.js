import React from "react";
// import Edit from "../images/edit.png";
import ReservationRow from "./ReservationRow"


export default function ReservationTable({ reservations, tables }) {
  // const handleClick = (target) => {
  //   reservations.find((reservation) => {
  //     if (reservation.reservation_id === target.reservation_id) {
  //       // assign table
  //     }
  //   });
  // };
  const reservationList = reservations.map(reservation => (<ReservationRow reservation={reservation} tables={tables} />))
  return (
    <table className="table table-striped border border-dark text-center">
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
