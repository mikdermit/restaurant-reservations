import React from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../../utils/api";

export default function FinishButton({ table }) {
  const history = useHistory();
  const handleFinish = async () => {
    const confirmFinish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    // if confirmed
    if (confirmFinish) {
      const controller = new AbortController();
      // update status
      finishTable(table.table_id, controller.signal)
        // refresh page
        .then(() => history.go());
      return () => controller.abort();
    }
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
