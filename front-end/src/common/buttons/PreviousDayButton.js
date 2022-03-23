import React from "react";
import { useHistory } from "react-router-dom";
import { previous } from "../../utils/date-time";

export default function PreviousDayButton({ date }) {
  const history = useHistory();
  // on click do:
  const handleClick = () => {
    const currentDate = date;
    // redirect to previous day
    history.push(`/dashboard?date=${previous(currentDate)}`);
  };
  return (
    <button onClick={handleClick} className="btn btn-secondary w-25">
      Previous Day
    </button>
  );
}
