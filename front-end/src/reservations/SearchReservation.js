import React, { useState } from "react";
import ReservationTable from "../reservations/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

function SearchReservationsForm(){
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState(null);
    const [foundReservations, setFoundReservations] = useState([]);

    function onChangeHandler(event){
        setMobileNumber(event.target.value);
    }

    function onSubmitHandler(event){
        event.preventDefault();
        setError(null);
        listReservations({ mobile_number: mobileNumber })
            .then(setFoundReservations)
            .catch(setError);
            console.log(foundReservations)
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Search</h1>
                   <div className="input-group justify-content-center">
                       <input
                           className="form-control col-9 my-3"
                           type="text"
                           name="mobile_number"
                           id="mobile_number"
                           placeholder="Enter a phone number"
                           onChange={onChangeHandler}
                           value={mobileNumber}
                       />
                       <button type="submit" className="btn btn-primary my-3" onClick={onSubmitHandler}>
                           Find
                       </button>
                   </div>
    
      

            <ErrorAlert error={error} />
            <ReservationTable reservations={foundReservations} />
            {foundReservations.length === 0 ? <h6>No reservations found</h6> : null}
        </div>
    );
}

export default SearchReservationsForm;