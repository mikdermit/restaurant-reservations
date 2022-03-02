import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { next, previous, today, formatAsDate } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory()
  // declare states and errors
  const [reservations, setReservations] = useState([]);
  const [viewDate, setViewDate] = useState({date})
  const [error, setError] = useState(null);

  // get date from url if present
  const dateURL = useQuery().get("date");
  if (dateURL) {
    setViewDate(dateURL)
  }

  // run loadDashboard each time the viewDate changes
  useEffect(loadDashboard, [setViewDate]);

  function loadDashboard() {
    const controller = new AbortController();

    setError(null);
    listReservations(viewDate, controller.signal)
      .then(setReservations)
      .catch(setError);

    return () => controller.abort();
  }

  // handle button clicks
  const handleClick = (target) => {
    if (target.name === "prev") {
      date = previous(date)
    } else if (target.name === "next") {
        date = next(date)
    } else { date = today() }
    setViewDate({date})
    console.log(viewDate)
    history.push(`/dashboard?date=${date}`)
  }

  // format date for display
  const displayDate = formatAsDate(date);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex align-items-center mb-3">
        <h4>Reservations for date</h4>
        <h4 className="ml-3">{displayDate}</h4>
      </div>
      <ErrorAlert error={error} />
      <p>{reservations ? JSON.stringify(reservations) : "loading"}</p>
      <button name="prev" className="btn" onClick={handleClick}>Previous Day</button>
      <button name="today" className="btn" onClick={handleClick}>Today</button>
      <button name="next" className="btn" onClick={handleClick}>Next Day</button>
    </main>
  );
}

export default Dashboard;

