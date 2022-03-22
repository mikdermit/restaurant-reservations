import React from "react";
import { useHistory } from "react-router-dom";
import { next } from "../../utils/date-time";

export default function NextDayButton({ date }) {
  const history = useHistory();
  // on click redirect to next day
  const handleClick = () => {
    const currentDate = date;
    history.push(`/dashboard?date=${next(currentDate)}`);
  };

  return (
    <button onClick={handleClick} className="btn btn-secondary w-25">
      Next Day
    </button>
  );
}
