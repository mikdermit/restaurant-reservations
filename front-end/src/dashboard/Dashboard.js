import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { formatAsDate, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/display/ReservationTable";
import TodayButton from "../common/buttons/TodayButton";
import NextDayButton from "../common/buttons/NextDayButton";
import PreviousDayButton from "../common/buttons/PreviousDayButton";

export default function Dashboard() {
  // get date from url, if any
  const dateURL = useQuery().get("date");
  const date = dateURL ? dateURL : today();
  // declare states
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  // loadReservations every time date changes
  useEffect(loadReservations, [date]);

  function loadReservations() {
    const controller = new AbortController();
    setError(null);
    // get reservations matching date
    listReservations({ date }, controller.signal)
      .then(setReservations)
      .catch(setError);

    return () => controller.abort();
  }

  // format date for display
  const displayDate = formatAsDate(date);

  // display error if any
  return (
    <main>
      {error ? <ErrorAlert error={error} /> : null}
      <div className="d-flex flex-column align-items-center">
        <h1>Dashboard</h1>
        <div className="d-flex align-items-center mb-3">
          <h3>Reservations for date:</h3>
          <h3 className="ml-2">{displayDate}</h3>
        </div>
        <ReservationTable reservations={reservations} />
        {reservations.length === 0 ? <h6>No reservations found</h6> : null}
        <div className="d-flex justify-content-around w-75 my-3">
          <PreviousDayButton date={date} />
          <TodayButton />
          <NextDayButton date={date} />
        </div>
      </div>
    </main>
  );
}
