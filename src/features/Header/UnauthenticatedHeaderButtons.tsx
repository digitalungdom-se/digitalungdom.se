import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AuthDialog from 'features/auth/Dialog';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      marginRight: theme.spacing(2),
    },
  }),
);

const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));

export default function UnauthenticatedHeaderButtons(): React.ReactElement {
  const classes = useStyles();
  const [authDialogState, setAuthDialogState] = React.useState<0 | 1 | 2>(0);

  return (
    <>
      <React.Suspense fallback>
        <AuthDialog onClose={(): void => setAuthDialogState(0)} open={Boolean(authDialogState)}>
          {(authDialogState === 1 && (
            <Login
              isDialog
              onSuccess={(): void => setAuthDialogState(0)}
              redirect={(): void => setAuthDialogState(2)}
            />
          )) ||
            (authDialogState === 2 && (
              <Register
                isDialog
                onSuccess={(): void => setAuthDialogState(0)}
                redirect={(): void => setAuthDialogState(1)}
              />
            ))}
        </AuthDialog>
      </React.Suspense>
      <Button
        className={classes.login}
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (e.metaKey === false && e.altKey === false) {
            e.preventDefault();
            setAuthDialogState(1);
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
            setAuthDialogState(2);
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
