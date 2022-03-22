import React from "react";
import { useHistory } from "react-router-dom";
import { today } from "../../utils/date-time";

export default function TodayButton() {
  const history = useHistory();
  // on click redirect to today
  const handleClick = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary w-25">
      Today
    </button>
  );
}
