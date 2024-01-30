import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReservationCtr from '../Containers/ReservationCtr/ReservationCtr';
import ReservationSeating from '../Containers/ReservationSeating/ReservationSeating';
import NotFound from '../ErrorHandlers/NotFound';

const ReservationRoutes = () => (
  <div>
    <Switch>
      <Route path={'/reservations/new'}>
        <ReservationCtr />
      </Route>
      <Route path={`/reservations/:reservation_id/edit`}>
        <ReservationCtr />
      </Route>
      <Route path={`/reservations/:reservation_id/seat`}>
        <ReservationSeating />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default ReservationRoutes;