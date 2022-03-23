import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservations/CreateReservation";
import EditReservation from "../reservations/EditReservation";
import SeatReservation from "../reservations/SeatReservation";
import SearchReservation from "../reservations/SearchReservation";
import CreateTable from "../tables/CreateTable";

function Routes() {

  // display error if any
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route path="/tables/new">
        <CreateTable />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
