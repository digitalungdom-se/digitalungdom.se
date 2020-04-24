import { Route, Switch, useHistory } from 'react-router-dom';

import Login from 'features/auth/Login';
import React from 'react';
import Register from 'features/auth/Register';
import Startpage from 'pages/Startpage';

function Router(): React.ReactElement {
  const history = useHistory();
  return (
    <Switch>
      <Route path="/logga-in">
        <Login onSuccess={(): void => history.push('/')} />
      </Route>
      <Route path="/bli-medlem">
        <Register onSuccess={(): void => history.push('/')} />
      </Route>
      <Route exact path="/">
        <Startpage />
      </Route>
    </Switch>
  );
}

export default Router;
