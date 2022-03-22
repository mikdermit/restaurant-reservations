import React, { useEffect, useState} from "react"
import { useHistory, useParams  } from "react-router-dom";
import { listTables, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "../common/forms/SeatForm";

export default function SeatReservation() {
  const history = useHistory();
  const {reservation_id} = useParams()
  // declare states and errors
  const [tableId, setTableId] = useState("")
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  // load tables
  useEffect(loadTables, [])
  // helper function
  function loadTables() {
    const controller = new AbortController();
    setError(null);
    // get tables
    listTables(controller.signal).then(setTables).catch(setError);

    return () => controller.abort();
  }
  // on submit:
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    console.log(tableId)
    // seat table
    seatTable(reservation_id, tableId, controller.signal)
      // redirect to dashboard
      .then(() => history.push(`/dashboard`))
      .catch(setError);
    return () => controller.abort();
  };
  // display error if any
  return (
    <>
      {error ? <ErrorAlert error={error} /> : null}
      <div className="d-flex flex-column align-items-center">
        <SeatForm
          tables={tables}
          tableId={tableId}
          setTableId={setTableId}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}