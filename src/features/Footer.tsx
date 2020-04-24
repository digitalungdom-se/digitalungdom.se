import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import React from 'react';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography align="center" color="textSecondary" variant="body2">
      {'Copyright © '}
      Digital Ungdom 2018-{new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 2),
    },
    headline: {
      textAlign: 'left',
    },
  });

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <footer className={classes.root}>
    <Copyright />
  </footer>
);

export default withStyles(styles)(Footer);
