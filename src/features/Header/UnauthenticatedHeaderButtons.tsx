import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AuthDialog from 'features/auth/Dialog';
import { AuthViews } from 'features/auth/authViewsTypes';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import VerifyEmailPage from 'features/auth/VerifyEmailPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      marginRight: theme.spacing(2),
    },
  }),
);

const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));

export default function UnauthenticatedHeaderButtons(): JSX.Element {
  const classes = useStyles();
  const [authDialogState, setAuthDialogState] = React.useState<AuthViews>(null);
  const changeDialogState = (state: AuthViews): void => {
    setAuthDialogState(state);
  };

  let dialog;

  switch (authDialogState) {
    case 'LOGIN':
      dialog = <Login isDialog onSuccess={(): void => setAuthDialogState(null)} redirect={changeDialogState} />;
      break;
    case 'REGISTER':
      dialog = <Register isDialog onSuccess={(): void => setAuthDialogState('VERIFY')} redirect={changeDialogState} />;
      break;
    case 'VERIFY':
      dialog = <VerifyEmailPage />;
      break;
    default:
      break;
  }

  return (
    <>
      <React.Suspense fallback>
        <AuthDialog onClose={(): void => setAuthDialogState(null)} open={Boolean(authDialogState)}>
          {dialog}
        </AuthDialog>
      </React.Suspense>
      <Button
        className={classes.login}
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (e.metaKey === false && e.altKey === false) {
            e.preventDefault();
            setAuthDialogState('LOGIN');
          }
        }}
        to="/logga-in"
        variant="contained"
      >
        Logga in
      </Button>
      <Button
        color="primary"
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (e.metaKey === false && e.altKey === false) {
            e.preventDefault();
            setAuthDialogState('REGISTER');
          }
        }}
        to="/bli-medlem"
        variant="contained"
      >
        Bli medlem
      </Button>
    </>
  );
}
