import { Route, Switch, useHistory } from 'react-router-dom';

import Loading from 'components/Loading';
import React from 'react';
import { loginWithCode } from 'features/auth/authApi';

const Agora = React.lazy(() => import('features/agora'));
const AgoraPost = React.lazy(() => import('features/agora/AgoraPost'));
const AgoraSubmit = React.lazy(() => import('features/agora/Submit'));
const About = React.lazy(() => import('pages/About'));
const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));
const Startpage = React.lazy(() => import('pages/Startpage'));
const Settings = React.lazy(() => import('features/settings'));
const UserPage = React.lazy(() => import('features/users'));
const VerifyEmailPage = React.lazy(() => import('features/auth/VerifyEmailPage'));

function Router(): React.ReactElement {
  const history = useHistory();
  return (
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/logga-in">
          <Login onSuccess={(email): void => history.push('/verify/' + btoa(email))} />
        </Route>
        <Route path="/verify/:emailInBase64">
          <VerifyEmailPage onSubmit={(email, loginCode) => loginWithCode(email, loginCode, () => history.push('/'))} />
        </Route>
        <Route path="/bli-medlem">
          <Register onSuccess={(email): void => history.push('/verify/' + btoa(email))} />
        </Route>
        <Route path="/@:username" render={({ match }) => <UserPage username={match.params.username} />} />
        <Route path="/agora/:hypagora/:shortID/comments">
          <div style={{ marginTop: 24 }}>
            <AgoraPost />
          </div>
        </Route>
        <Route path="/agora/:hypagora?/submit">
          <div style={{ marginTop: 24 }}>
            <AgoraSubmit />
          </div>
        </Route>
        <Route path="/agora/:hypagora?/:sort?/:dateAfter?/:dateBefore?">
          <Agora />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/settings/:section">
          <Settings />
        </Route>
        <Route exact path="/">
          <Startpage />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default Router;
