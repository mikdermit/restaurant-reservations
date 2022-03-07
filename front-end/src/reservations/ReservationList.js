import React from "react";
import { Link } from "react-router-dom";
import Edit from "../images/edit.png";

export default function ResrvationList({ reservations }) {
  console.log(reservations);
  const handleClick = target => {
      reservations.find(reservation => {
          if (reservation.reservation_id === target.reservation_id) {
              // assign table
          }}
          )
  }
  const reservationList = reservations.map((reservation) => {
    return (
      <div className="card p-3 mb-3" key={reservation.id}>
        <div className="d-flex flex-column">
          <Link to={`/reservations/${reservation.reservation_id}/edit`} className="justify-content-end ml-auto" >
            <img
              src={Edit}
              width="25"
            />
          </Link>
          <div className="mb-3 text-center">
            <h6 className="align-items-lg-start">
            {reservation.reservation_time}
            </h6>
            <h5 className="mb-2">
              {reservation.first_name} {reservation.last_name}
            </h5>
            <h5 className=" align-items-lg-end">{reservation.mobile_number}</h5>
          </div>
          <div className="text-center align-items-center">
            <button className="btn btn-primary align-items-lg-start mb-2" onClick={handleClick}>
              Seat
            </button>
            <h6 className="text-muted align-items-lg-center m-lg-auto">
            Party of {reservation.people}
              
            </h6>
          </div>
        </div>
        {/* //   <div className="card p-4">
    //     <div className="d-flex flex-sm-column flex-md-row align-items-center">
    //       <div className="d-flex flex-md-column align-items-lg-start mr-md-auto">
    //         <button className="btn btn-primary mb-3">Seat</button>
    //         <h6 className="text-muted">{reservation.people} people</h6>
    //       </div>
    //       <div className="d-flex flex-lg-column align-items-lg-center">
    //       <h5 className="mb-3">{reservation.reservation_time}</h5>
    //         <h5>
    //           {reservation.first_name} {reservation.last_name}
    //         </h5>
    //       </div>
    //       <div className="d-flex flex-md-column align-items-md-end ml-md-auto"> 
    //         <button className="btn btn-secondary mb-3">edit</button>
    //         <h6>{reservation.mobile_number}</h6>
    //       </div>
    //     </div>
    //   </div> */}
      </div>
    );
  });
  return reservationList;
}
