import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
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
  const authenticated = useSelector(selectAuthenticated);

  return (
    <AppBar className={classes.root} color="inherit" position="sticky">
      <Toolbar>
        <Typography className={classes.title} component="h1" style={{ color: '#1e6ee8', fontWeight: 600 }} variant="h6">
          <Link to="/">Digital Ungdom</Link>
        </Typography>
        {!authenticated ? <UnauthenticatedHeaderButtons /> : <LogoutHeaderButton />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
