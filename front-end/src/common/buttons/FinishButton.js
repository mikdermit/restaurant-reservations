import React from "react";

export default function FinishButton({ table, finishTable }) {
  // on click do:
  const handleFinish = (event) => {
    event.preventDefault();
    // finish table
    finishTable(table.table_id);
  };
  return (
    <button
      className="btn btn-primary mt-2"
      data-table-id-finish={table.table_id}
      onClick={handleFinish}
    >
      Finish
    </button>
  );
}
