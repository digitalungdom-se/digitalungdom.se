import { Route, Switch } from 'react-router-dom';

import Login from 'features/Login';
import React from 'react';
import Startpage from 'pages/Startpage';

function Router() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Startpage />
      </Route>
    </Switch>
  );
}

export default Router;
