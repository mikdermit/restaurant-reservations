import React from "react";
import { useHistory } from "react-router-dom";
import { updateStatus } from "../../utils/api";

export default function CancelButton({ reservationId, setError }) {
  const history = useHistory();
  // on cancel do:
  const handleCancel = () => {
    // alert message
    if (
      window.confirm(
        `Do you want to cancel this reservation?\n\nThis cannot be undone.`
      )
    ) {
      // on confirm, update status and go back to previous page
      updateStatus(reservationId, "cancelled")
      history.goBack()
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
