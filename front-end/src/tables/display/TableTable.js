import React from "react";
import TableRow from "./TableRow";

export default function TableTable({ tables, finishTable }) {
  const tableList = tables.map((table) => (
    <TableRow key={table.table_id} table={table} finishTable={finishTable} />
  ));
  return (
    <table className="table table-striped border border-dark text-center w-50 mt-3">
      <thead className="thead-dark">
        <tr>
          <th className="col-sm-2">Status</th>
          <th className="col-sm-1">ID</th>
          <th className="col-sm-2">Name</th>
          <th className="col-sm-1">Capacity</th>
          <th className="col-sm-1"></th>
        </tr>
      </thead>
      <tbody>{tableList}</tbody>
    </table>
  );
}
