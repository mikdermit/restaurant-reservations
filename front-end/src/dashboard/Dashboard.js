import React from "react";
import { useHistory } from "react-router-dom"
import { formatAsDate } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date, reservations }) {
  const history = useHistory()
  // handle button clicks
  const handleClick = () => {
    history.push(`/dashboard?date=${date}`)
  }
  // format date for display
  const displayDate = formatAsDate(date);
  // display loading if no reservations
  return !reservations ? (<h1>loading</h1>) : (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex align-items-center mb-3">
        <h4>Reservations for date</h4>
        <h4 className="ml-3">{displayDate}</h4>
      </div>
      <p>{JSON.stringify(reservations)}</p>
      <button name="prev" className="btn">Previous Day</button>
      <button name="today" className="btn" >Today</button>
      <button name="next" className="btn">Next Day</button>
    </main>
  );
}

export default Dashboard;

