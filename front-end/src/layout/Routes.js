import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { listReservations } from "../utils/api";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery"
import ErrorAlert from "../layout/ErrorAlert";
import NotFound from "./NotFound";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservations/CreateReservation"
import EditReservation from "../reservations/EditReservation"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const dateURL = useQuery().get("date");
  const date = (dateURL) ? dateURL : today();

  const [reservations, setReservations] = useState([])
  const [error, setError] = useState(null)

  useEffect(loadReservations, [date]) 

  function loadReservations() {
    const controller = new AbortController();

    setError(null);
    listReservations({date}, controller.signal)
      .then(setReservations)
      .catch(setError);

    return () => controller.abort();
  }
  
  return (error) ? (<ErrorAlert error={error} />) : (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} reservations={reservations}/>
      </Route>
      <Route path="/reservations/new">
        <CreateReservation loadReservations={loadReservations}/>
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation loadReservations={loadReservations}/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
