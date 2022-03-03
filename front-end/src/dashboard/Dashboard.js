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
  const [error, setError] = useState(null);

  // run loadDashboard every time the date changes
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const controller = new AbortController();

    setError(null);
    listReservations({date}, controller.signal)
      .then(setReservations)
      .catch(setError);

    return () => controller.abort();
  }

  // handle button clicks
  const handleClick = () => {
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
      <button name="prev" className="btn">Previous Day</button>
      <button name="today" className="btn" >Today</button>
      <button name="next" className="btn">Next Day</button>
    </main>
  );
}

export default Dashboard;

