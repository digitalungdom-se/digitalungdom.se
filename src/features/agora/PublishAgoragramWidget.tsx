import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      // marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
  }),
);

const PublishAgoragramWidget = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography component="h6" variant="h6">
        Agora
      </Typography>
      <Typography>
        <b>Agora</b> är Digital Ungdoms egna forum där medlemmar kan göra inlägg.
      </Typography>
      <Typography variant="subtitle2">
        Agora är benämningen av torg i antika grekiska städer. De användes som marknadsplats eller allmän mötesplats.
      </Typography>
      <Button
        color="primary"
        component={RouterLink}
        disableElevation
        fullWidth
        to={`/agora/submit`}
        variant="contained"
      >
        Publish
      </Button>
    </Paper>
  );
};

export default PublishAgoragramWidget;
