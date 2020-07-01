import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyEmailPage() {
  const classes = useStyles();
  return (
    <Container component="main" disableGutters maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Verify e-mail
        </Typography>
        <MailIcon fontSize="large" />
        <Typography>Please verify your e-mail to complete signup.</Typography>
      </div>
    </Container>
  );
}
