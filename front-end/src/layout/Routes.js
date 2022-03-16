import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import NotFound from "./NotFound";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservations/CreateReservation"
import EditReservation from "../reservations/EditReservation"
import SearchReservation from "../reservations/SearchReservation"

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
      {/* <Redirect from="/" to="/dashboard" />
      <Redirect from="/reservations" to="/dashboard" /> */}
      <Route path="/dashboard" render={() => <Dashboard date={date} /> }/>
      <Route path="/reservations/new" component={CreateReservation} setError={setError} />
      <Route path="/reservations/:reservationId/edit" component={EditReservation} />
      <Route path="/search" component={SearchReservation} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
