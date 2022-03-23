import React, { useEffect, useState } from "react";
import { listReservations, listTables, clearTable } from "../utils/api";
import { formatAsDate, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/display/ReservationTable";
import TableTable from "../tables/display/TableTable";
import TodayButton from "../common/buttons/TodayButton";
import NextDayButton from "../common/buttons/NextDayButton";
import PreviousDayButton from "../common/buttons/PreviousDayButton";

export default function Dashboard() {
  // get date from url, if any
  const dateURL = useQuery().get("date");
  const date = dateURL ? dateURL : today();
  // declare states and errors
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  // load dashboard
  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    // get reservations matching date
    listReservations({ date }, controller.signal)
      .then(setReservations)
      .catch(setError);
    // get tables
    listTables(controller.signal).then(setTables).catch(setError);
    return () => controller.abort();
  }, [date]);

  // function to clear table when finished
  const finishTable = async (table_id) => {
    const confirmFinish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    // if confirmed
    if (confirmFinish) {
      const controller = new AbortController();
      // finish table
      clearTable(table_id, controller.signal)
        // get reservations matching date
        .then(() => listReservations({ date }, controller.signal))
        .then(setReservations)
        .then(() => listTables(controller.signal))
        .then(setTables)
        .catch(setError);
      return () => controller.abort();
    }
  };

  // format date for display
  const displayDate = formatAsDate(date);
  // display error if any
  return (
    <main>
      {error ? <ErrorAlert error={error} /> : null}
      <div className="d-flex flex-column align-items-center mt-2">
        <h3>Dashboard</h3>
        <TableTable tables={tables} finishTable={finishTable} />
        <div className="d-flex align-items-center mb-3 mt-2">
          <h4>Reservations for date:</h4>
          <h4 className="ml-2">{displayDate}</h4>
        </div>
        <ReservationTable reservations={reservations} />
        {reservations.length === 0 ? <h6>No reservations found</h6> : null}
        <div className="d-flex justify-content-around w-75 mt-5">
          <PreviousDayButton date={date} />
          <TodayButton />
          <NextDayButton date={date} />
        </div>
      </div>
    </main>
  );
}
