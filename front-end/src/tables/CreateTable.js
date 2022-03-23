import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "../common/forms/TableForm";

export default function CreateTable() {
  const history = useHistory();
  // define default form state
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };
  // declare states and errors
  const [table, setTable] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  // on submit do:
  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    // create reservation
    createTable(table, controller.signal)
      // redirect to reservation date's dashboard
      .then(() => history.push(`/dashboard`))
      .catch(setError);
    return () => controller.abort();
  };
  
  // display error if any
  return (
    <>
      {error ? <ErrorAlert error={error} /> : null}
      <div className="d-flex flex-column align-items-center">
        <TableForm
          type="Create"
          table={table}
          setTable={setTable}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
