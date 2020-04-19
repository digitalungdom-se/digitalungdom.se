import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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

  return (
    <AppBar className={clsx(classes.root)} position="sticky" color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Digital Ungdom
        </Typography>
        <Button variant="contained" disableElevation className={classes.login}>
          Logga in
        </Button>
        <Button color="primary" variant="contained" disableElevation>
          Bli medlem
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
