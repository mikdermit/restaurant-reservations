import React, { useState } from "react";

export default function SeatButton({ reservation }) {
  const displayButton = reservation.status === "booked" ? true : false;
  const [toggle, setToggle] = useState({ ...displayButton });

  const handleClick = () => {
    reservation.status = "seated";
    setToggle(false);
  };

  return displayButton ? (
    <button className="btn btn-primary align-items-lg-start mb-2">Seat</button>
  ) : null;
}
