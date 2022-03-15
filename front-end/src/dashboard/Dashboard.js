import React, { useEffect, useState  } from "react";
import { useHistory  } from "react-router-dom";
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

function Dashboard({ date }) {
  const history = useHistory();

  // get date from url
  const dateURL = useQuery().get("date");
  if (dateURL) {
    date = dateURL;
  }
  // declare states
  const [reservations, setReservations] = useState([]);
  const [ error, setError ] = useState(null)

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
  return (
    <main>
      <h1>hello</h1>
    </main>
  );
}

export default Dashboard;
