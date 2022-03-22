import React from "react";
import { Link } from "react-router-dom";
// import Edit from "../../images/edit.png"

export default function EditButton({ reservation }) {
  // redirect to edit page
  return (
    <Link to={`/reservations/${reservation.reservation_id}/edit`}>
      <button className="btn btn-secondary" type="button">
        Edit
      </button>
    </Link>

    // replace with this button
    //  <Link to={`/reservations/${reservation.reservation_id}/edit`}>
    //     <img src={Edit} width="22" alt="edit" />
    //  </Link>
  );
}
