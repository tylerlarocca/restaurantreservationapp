import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../ErrorHandlers/NotFound';
import TableCtr from '../Containers/TableCtr/TableCtr';

const Tables = () => (
  <div>
    <Switch>
      <Route path={'/tables/new'}>
        <TableCtr />
      </Route>
      <Route path={`/tables/:table_id/edit`}>
        <TableCtr />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default Tables;