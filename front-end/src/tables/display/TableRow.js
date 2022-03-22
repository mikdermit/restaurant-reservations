import React from "react";
import FinishButton from "../../common/buttons/FinishButton";

export default function TableRow({ table }) {
  const status = table.status === "occupied" ? true : false;
  return (
    <tr>
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
      <td className="align-middle">{status ? <FinishButton /> : null}</td>
    </tr>
  );
}
