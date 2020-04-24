import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import AuthDialog from 'features/auth/Dialog';
import { Link } from 'react-router-dom';
import Login from 'features/auth/Login';
import LogoutHeaderButton from './LogoutHeaderButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UnauthenticatedHeaderButtons from './UnauthenticatedHeaderButtons';
import { selectAuthenticated } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
    login: {
      marginRight: theme.spacing(2),
    },
  }),
);

function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const authenticated = useSelector(selectAuthenticated);

  return (
    <AppBar className={classes.root} color="inherit" position="sticky">
      <Toolbar>
        <AuthDialog onClose={(): void => setOpen(false)} open={open}>
          <Login onSuccess={(): void => setOpen(false)} />
        </AuthDialog>
        <Typography className={classes.title} variant="h6">
          <Link to="/">Digital Ungdom</Link>
        </Typography>
        {!authenticated ? <UnauthenticatedHeaderButtons onOpen={(): void => setOpen(true)} /> : <LogoutHeaderButton />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
