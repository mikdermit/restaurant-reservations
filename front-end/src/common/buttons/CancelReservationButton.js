import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Dashboard from "../../dashboard/Dashboard";
import { updateStatus } from "../../utils/api";

export default function CancelReservationButton({ reservation }) {
  const history = useHistory();
  // on cancel do:
  async function handleCancel(){
    const proceedWithCancel = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if (proceedWithCancel) {
      const {reservation_id} = reservation
        await updateStatus(reservation_id, "cancelled");
        history.go()
    }
}

  return (
    <button data-reservation-id-cancel={reservation.reservation_id} type="button" className="btn btn-secondary m-3" onClick={handleCancel}>
      Cancel
    </button>
  );
}
