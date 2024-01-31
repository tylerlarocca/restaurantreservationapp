import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Containers/layout/Layout';

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
  );
};

export default App;