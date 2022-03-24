import React from "react";
import SubmitButton from "../../common/buttons/SubmitButton";
import BackButton from "../../common/buttons/BackButton";

export default function SeatForm({
  tables,
  tableId,
  setTableId,
  handleSubmit,
}) {
  // on change do:
  const handleChange = ({ target }) => {
    // replace current value with input
    setTableId(target.value);
  };
  // options for tables
  const tableOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h2 className="my-3">Seat Reservation</h2>
      <div className="card p-4 mt-2">
        <form onSubmit={handleSubmit}>
          <div className="form-row align-items-center justify-content-center">
            <label htmlFor="table_id" className="mr-3 my-auto">
              Table Number
            </label>
            <select
              className="form-select"
              id="table_id"
              name="table_id"
              value={tableId}
              onChange={handleChange}
            >
              <option defaultValue>Select</option>
              {tableOptions}
            </select>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <SubmitButton />
          </div>
        </form>
      </div>
      <BackButton />
    </div>
  );
}
