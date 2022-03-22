import React from "react";
import { Link } from "react-router-dom";

export default function SeatButton({ reservation }) {
  return (
    <Link to={`/reservations/${reservation.reservation_id}/seat`}>
      <button className="btn btn-primary align-items-lg-start m-1">Seat</button>
    </Link>
  );
}
