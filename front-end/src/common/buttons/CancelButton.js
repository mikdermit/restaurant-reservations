import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Dashboard from "../../dashboard/Dashboard";
import { updateStatus } from "../../utils/api";

export default function CancelButton({ reservation, setError }) {
  const history = useHistory();
  // on cancel do:
  const handleCancel = () => {
    // alert message
    if (
      window.confirm(
        `Do you want to cancel this reservation?\n\nThis cannot be undone.`
      )
    ) {
      const { reservation_id, reservation_date } = reservation
      // on confirm, update status and go back to previous page
      updateStatus(reservation_id, "cancelled")
      history.go(-1)
    } else {
      // on cancel, go back to previous page
      history.goBack();
    }
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
      Cancel
    </button>
  );
}
