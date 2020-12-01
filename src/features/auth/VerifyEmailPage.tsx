import { Field, Formik } from 'formik';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import { TranslatedTextField as TextField } from 'components/TranslatedTextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

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

interface VerifyEmailPageProps {
  email?: string;
  onSubmit: (email: string, loginCode: string) => void;
}

interface VerifyEmailPageParams {
  emailInBase64: string;
}

export default function VerifyEmailPage({
  email,
  onSubmit = (): void => {},
}: VerifyEmailPageProps): React.ReactElement {
  const classes = useStyles();
  const { emailInBase64 } = useParams<VerifyEmailPageParams>();
  return (
    <Container component="main" disableGutters maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Verify e-mail
        </Typography>
        <MailIcon fontSize="large" />
        {email || atob(emailInBase64)}
        <Formik
          initialValues={{ loginCode: '' }}
          onSubmit={(values) => {
            onSubmit(email || atob(emailInBase64), values.loginCode);
          }}
        >
          {({ values, isSubmitting, submitForm }) => (
            <>
              <Field
                component={TextField}
                fullWidth
                id="loginCode"
                label="code"
                margin="normal"
                multiline
                name="loginCode"
                required
                variant="outlined"
              />
              <Button disabled={isSubmitting} onClick={submitForm} type="submit" variant="contained">
                Submit
              </Button>
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
}
