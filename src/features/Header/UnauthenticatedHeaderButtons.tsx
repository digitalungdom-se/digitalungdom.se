import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      marginRight: theme.spacing(2),
    },
    background: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  }),
);

interface UnauthenticatedHeaderButtonsProps {
  listItems?: boolean;
}

export default function UnauthenticatedHeaderButtons({ listItems }: UnauthenticatedHeaderButtonsProps): JSX.Element {
  const classes = useStyles();
  const showAuthDialog = useAuthDialog();

  if (listItems)
    return (
      <>
        <ListItem
          button
          className={classes.background}
          component={Link}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (e.metaKey === false && e.altKey === false) {
              e.preventDefault();
              showAuthDialog('REGISTER');
            }
          }}
          to="/bli-medlem"
        >
          <ListItemText primary="Bli medlem" />
        </ListItem>
        <ListItem
          button
          component={Link}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (e.metaKey === false && e.altKey === false) {
              e.preventDefault();
              showAuthDialog('LOGIN');
            }
          }}
          to="/logga-in"
        >
          <ListItemText primary="Logga in" />
        </ListItem>
      </>
    );

  return (
    <>
      <Button
        className={classes.login}
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (e.metaKey === false && e.altKey === false) {
            e.preventDefault();
            showAuthDialog('LOGIN');
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
            showAuthDialog('REGISTER');
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
