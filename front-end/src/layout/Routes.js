import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
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
  const date = today();
const [error, setError] = useState(null)
  
  
  return (error) ? (<ErrorAlert error={error} />) : (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setError={setError} />
      </Route>
      <Route path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
