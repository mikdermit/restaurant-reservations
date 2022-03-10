import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import { next, previous, today, formatAsDate } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import LoadingMessage from "../layout/LoadingMessage";
import ReservationList from "../reservations/ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date, setError }) {
  const history = useHistory();

  // get date from url
  const dateURL = useQuery().get("date");
  if (dateURL) {
    date = dateURL;
  }
  // declare states
  const [reservations, setReservations] = useState([]);

  // loadReservations every time date changes
  useEffect(loadReservations, [date]);

  function loadReservations() {
    const controller = new AbortController();
    // clear errors, if any
    setError(null);
    // get reservations
    listReservations({ date }, controller.signal)
      .then(setReservations)
      .catch(setError);

    return () => controller.abort();
  }

  // on click:
  const handleClick = (newDate) => {
    // redirect to reservation date's dashboard
    history.push(`/dashboard?date=${newDate}`);
  };

  // format date for display
  const displayDate = formatAsDate(date);

  // display loading if no reservations
  return !reservations ? (
    <LoadingMessage />
  ) : (
    <main>
      <div className="d-flex flex-column align-items-center">
        <h1>Dashboard</h1>
        <div className="d-flex align-items-center mb-3">
          <h4>Reservations for date:</h4>
          <h4 className="ml-2">{displayDate}</h4>
        </div>
        <ReservationList reservations={reservations} />

        <div className="d-flex justify-content-around w-75">
          <button
            onClick={() => handleClick(previous(date))}
            className="btn btn-secondary w-25"
          >
            Previous Day
          </button>
          <button
            onClick={() => handleClick(today())}
            className="btn btn-primary w-25"
          >
            Today
          </button>
          <button
            onClick={() => handleClick(next(date))}
            className="btn btn-secondary w-25"
          >
            Next Day
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
