import React from "react";
import { useHistory } from "react-router-dom";
import { previous } from "../../utils/date-time";

export default function PreviousDayButton({ date }) {
  const history = useHistory();
  // on click redirect to previous day
  const handleClick = () => {
    const currentDate = date;
    history.push(`/dashboard?date=${previous(currentDate)}`);
  };
  return (
    <button onClick={handleClick} className="btn btn-secondary w-25">
      Previous Day
    </button>
  );
}
