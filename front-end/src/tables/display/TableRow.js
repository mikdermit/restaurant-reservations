import React from "react";
import FinishButton from "../../common/buttons/FinishButton";

export default function TableRow({ table, finishTable }) {
  const status = table.reservation_id ? true : false;
  return (
    <tr key={table.table_id}>
      <td
        className={`align-middle ${status ? "text-danger" : "text-success"}`}
        data-table-id-status={table.table_id}
      >
        {table.status}
      </td>
      <th scope="row" className="align-middle">
        {table.table_id}
      </th>
      <td className="align-middle">{table.table_name}</td>
      <td className="align-middle">{table.capacity}</td>
      <td className="align-middle">
        {status ? <FinishButton table={table} finishTable={finishTable} /> : null}
      </td>
    </tr>
  );
}
