import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { makeStyles } from '@material-ui/core/styles';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  text: {
    margin: theme.spacing(3, 0),
  },
}));

export interface VerifyEmailLinkProps {
  error?: undefined | Error;
  loading: boolean;
  data?: any;
}

export function VerifyEmailLink({ data, error, loading }: VerifyEmailLinkProps): React.ReactElement {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" disableGutters maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserIcon />
        </Avatar>
        <Typography className={classes.text} component="h1" variant="h5">
          Verifying email
        </Typography>
        {loading && <CircularProgress />}
        {Boolean(error) && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong while verifying your email. Please make sure that the entire link is correct.
          </Alert>
        )}
        {Boolean(data) && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You have successfully verified your email.
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default function (): React.ReactElement {
  const { token } = useParams();

  const [{ data, loading, error }] = useAxios({
    method: 'POST',
    params: {
      token,
    },
    url: '/api/user/verify',
  });

  return <VerifyEmailLink data={data} error={error} loading={loading} />;
}
