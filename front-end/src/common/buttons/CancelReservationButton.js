import React from "react";
import { useHistory } from "react-router-dom";
import { updateStatus } from "../../utils/api";

export default function CancelReservationButton({ reservation }) {
  const history = useHistory();
  // on click do:
  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    // if confirmed
    if (confirmCancel) {
      const controller = new AbortController();
      const { reservation_id } = reservation;
      // update status
      updateStatus(reservation_id, "cancelled", controller.signal)
        // refresh page
        .then(() => history.go());
      return () => controller.abort();
    }
  };
  return (
    <button
      data-reservation-id-cancel={reservation.reservation_id}
      type="button"
      className="btn btn-danger m-1"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}
