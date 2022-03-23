import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { seatTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "../common/forms/SeatForm";

export default function SeatReservation() {
  const history = useHistory();
  // get reservation id from url
  const { reservation_id } = useParams();
  // declare states and errors
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [error, setError] = useState(null);

  // get tables when reservation_id changes
  useEffect(() => {
    const controller = new AbortController();
    listTables(controller.signal).then(setTables).catch(setError);
    return () => controller.abort();
  }, [reservation_id]);

  // on submit do:
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
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
