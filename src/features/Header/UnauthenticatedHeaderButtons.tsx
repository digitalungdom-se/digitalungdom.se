import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

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

export default function UnauthenticatedHeaderButtons(props: { onOpen: () => void }): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.login}
        component={Link}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          props.onOpen();
        }}
        to="/login"
        variant="contained"
      >
        Logga in
      </Button>
      <Button color="primary" disableElevation variant="contained">
        Bli medlem
      </Button>
    </>
  );
}
