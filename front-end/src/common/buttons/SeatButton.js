import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { updateStatus } from "../../utils/api"

export default function SeatButton({ reservation }) {
  const history = useHistory()
  // const [toggle, setToggle] = useState({ ...displayButton });

  const handleClick = () => {
    const { reservation_id } = reservation;
    // update status
    updateStatus(reservation_id, "seated");
    // refresh page
    history.go();
  };

return (
    <button className="btn btn-primary align-items-lg-start m-1" onClick={handleClick}>Seat</button>
)
}
