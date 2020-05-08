import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AuthDialog from 'features/auth/Dialog';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Login from 'features/auth/Login';
import React from 'react';
import Register from 'features/auth/Register';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function UnauthenticatedHeaderButtons(): React.ReactElement {
  const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = React.useState(false);

  return (
    <>
      <AuthDialog onClose={(): void => setLoginDialogOpen(false)} open={loginDialogOpen}>
        <Login onSuccess={(): void => setLoginDialogOpen(false)} />
      </AuthDialog>
      <AuthDialog onClose={(): void => setRegisterDialogOpen(false)} open={registerDialogOpen}>
        <Register onSuccess={(): void => setRegisterDialogOpen(false)} />
      </AuthDialog>
      <Button
        className={classes.login}
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (e.metaKey === false && e.altKey === false) {
            e.preventDefault();
            setLoginDialogOpen(true);
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
            setRegisterDialogOpen(true);
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
