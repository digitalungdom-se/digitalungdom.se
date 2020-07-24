import { Route, Switch, useHistory } from 'react-router-dom';

import React from 'react';

const Agora = React.lazy(() => import('features/agora'));
const AgoraSubmit = React.lazy(() => import('features/agora/Submit'));
const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));
const Startpage = React.lazy(() => import('pages/Startpage'));
const VerifyEmailLink = React.lazy(() => import('features/auth/VerifyEmailLink'));

function Router(): React.ReactElement {
  const history = useHistory();
  return (
    <React.Suspense fallback={'Loading...'}>
      <Switch>
        <Route path="/logga-in">
          <Login onSuccess={(): void => history.push('/')} />
        </Route>
        <Route path="/bli-medlem">
          <Register onSuccess={(): void => history.push('/')} />
        </Route>
        <Route path="/verify/:token">
          <VerifyEmailLink />
        </Route>
        <Route path="/agora/:hypagora?/submit">
          <AgoraSubmit />
        </Route>
        <Route path="/agora/:hypagora?/:sort?/:dateAfter?/:dateBefore?">
          <Agora />
        </Route>
        <Route exact path="/">
          <Startpage />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default Router;
