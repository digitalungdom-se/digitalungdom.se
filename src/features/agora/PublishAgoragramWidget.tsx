import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    definition: {
      margin: theme.spacing(2, 0),
    },
    header: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

const PublishAgoragramWidget = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        className={classes.header}
        title={
          <Typography component="h6" variant="h6">
            Agora
          </Typography>
        }
      />
      <CardContent>
        <Typography>
          <b>Agora</b> är Digital Ungdoms egna forum där medlemmar kan göra inlägg.
        </Typography>
        <Typography className={classes.definition} variant="subtitle2">
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
      </CardContent>
    </Card>
  );
};

export default PublishAgoragramWidget;
