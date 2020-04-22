import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LoginDialog from 'features/Login/Dialog';
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
  const [open, setOpen] = React.useState(false);

  return (
    <AppBar className={clsx(classes.root)} color="inherit" position="sticky">
      <Toolbar>
        <LoginDialog onClose={() => setOpen(false)} open={open} />
        <Typography className={classes.title} variant="h6">
          <Link to="/">Digital Ungdom</Link>
        </Typography>
        <Button
          className={classes.login}
          component={Link}
          disableElevation
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setOpen(true);
          }}
          to="/login"
          variant="contained"
        >
          Logga in
        </Button>
        <Button color="primary" disableElevation variant="contained">
          Bli medlem
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
