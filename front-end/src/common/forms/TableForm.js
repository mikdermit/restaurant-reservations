import React from "react";
import SubmitButton from "../../common/buttons/SubmitButton";
import BackButton from "../../common/buttons/BackButton";

export default function ReservationForm({
  type,
  table,
  setTable,
  handleSubmit,
}) {
  // on change so:
  const handleChange = ({ target }) => {
    target.name === "capacity"
      ? // if capacity, convert to Number and replace current value with input
        setTable({ ...table, [target.name]: Number(target.value) })
      : // replace current value with input
        setTable({ ...table, [target.name]: target.value });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="my-3">{type} Table</h2>
      <div className="card p-4 mt-2 ">
        <form onSubmit={handleSubmit}>
          <div className="form-row justify-content-center">
            <div className="form-group col-4">
              <label htmlFor="table_name">Table Name</label>
              <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                value={table.table_name}
                onChange={handleChange}
                placeholder="#1"
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                value={table.capacity}
                onChange={handleChange}
                placeholder="1"
              />
            </div>
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
