import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../Containers/dashboard/Dashboard';
import Search from '../Containers/Search/SearchCtr';
import Tables from './Tables';
import NotFound from '../ErrorHandlers/NotFound';
import ReservationRoutes from './Reservations';
import { today } from '../utils/date-time';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path="/reservations">
        <ReservationRoutes />
      </Route>
      <Route path="/tables">
        <Tables />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;