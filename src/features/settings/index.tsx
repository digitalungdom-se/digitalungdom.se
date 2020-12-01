import { Route, Switch } from 'react-router-dom';
import SettingsList, { SettingsTabs } from './SettingsList';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AccountSettings from './AccountSettings';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import SecuritySettings from './SecuritySettings';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      // scrolling glitch: https://github.com/mui-org/material-ui/issues/7466
      width: '100% !important',
      margin: `${theme.spacing(0, 0, 0, 0)} !important`,
    },
    paper: {
      padding: theme.spacing(3),
    },
    divider: {
      marginTop: theme.spacing(1),
    },
  }),
);

export default function Settings(): JSX.Element {
  const classes = useStyles();
  const { section } = useParams();

  const title = (
    <Typography component="h2" variant="h6">
      {section && section[0].toUpperCase() + section?.substring(1)}
    </Typography>
  );

  return (
    <Grid alignItems="flex-start" className={classes.grid} container direction="row" justify="center" spacing={3}>
      <Hidden smDown>
        <Grid item>
          <SettingsList selected={section} />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <SettingsTabs selected={section} />
      </Hidden>
      <Grid item lg={5} md={7} sm={9} xs={12}>
        <Paper className={classes.paper}>
          <Hidden smDown>
            {title}
            <Divider className={classes.divider} />
          </Hidden>
          <Switch>
            <Route path="/settings/account">
              <AccountSettings />
            </Route>
            <Route path="/settings/security">
              <SecuritySettings />
            </Route>
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}
