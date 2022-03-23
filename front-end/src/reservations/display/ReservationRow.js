import React from "react";
import SeatButton from "../../common/buttons/SeatButton";
import CancelReservationButton from "../../common/buttons/CancelReservationButton";
import EditButton from "../../common/buttons/EditButton";

export default function ReservationRow({ reservation }) {
  const status = reservation.status === "booked" ? true : false;
  return (
    <tr>
      <td
        className={`align-middle ${
          status
            ? "text-success"
            : reservation.status === "seated"
            ? "text-warning"
            : "text-danger"
        }`}
        data-reservation-id-status={reservation.reservation_id}
      >
        {reservation.status}
      </td>
      <th scope="row" className="align-middle">
        {reservation.reservation_id}
      </th>
      <td className="align-middle">
        {reservation.first_name} {reservation.last_name}
      </td>
      <td className="align-middle">{reservation.mobile_number}</td>
      <td className="align-middle">{reservation.reservation_date}</td>
      <td className="align-middle">{reservation.reservation_time}</td>
      <td className="align-middle">{reservation.people}</td>
      <td className="align-middle">
        {status ? <CancelReservationButton reservation={reservation} /> : null}
      </td>
      <td className="align-middle">
        {status ? <EditButton reservation={reservation} /> : null}
      </td>
      <td className="align-middle">
        {status ? (
          <SeatButton reservation={reservation} />
        ) : null}
      </td>
    </tr>
  );
}
