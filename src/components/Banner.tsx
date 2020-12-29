import { Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      fontSize: theme.typography.body1.fontSize,
      fontWeight: 'bold',
      padding: theme.spacing(2, 0),
      textAlign: 'center',
    },
  });

interface BannerProps extends WithStyles<typeof styles> {
  children?: React.ReactNode;
}

const Banner = withStyles(styles)(({ classes, children }: BannerProps) => (
  <div className={classes.root}>{children}</div>
));

export default Banner;
