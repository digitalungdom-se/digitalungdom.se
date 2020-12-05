import { Field, Formik } from 'formik';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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
  onSubmit: (email: string, loginCode: string) => Promise<void>;
}

interface VerifyEmailPageParams {
  emailInBase64: string;
}

export default function VerifyEmailPage({ email, onSubmit }: VerifyEmailPageProps): React.ReactElement {
  const classes = useStyles();
  const { emailInBase64 } = useParams<VerifyEmailPageParams>();
  return (
    <Container component="main" disableGutters maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {'Kolla din e-mail' /* Translation needed */}
        </Typography>
        <img alt="bot has mail" src={require('resources/images/verify.png')} />
        <Typography paragraph>
          Du har fått ett e-mail till <code>{email || atob(emailInBase64)}</code> med en inloggningskod. Skriv in den
          här och logga in! {/* Translation needed */}
        </Typography>
        <Formik
          initialValues={{ loginCode: '' }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            onSubmit(email || atob(emailInBase64), values.loginCode)
              .then(() => setSubmitting(false))
              .catch(() => {
                setErrors({ loginCode: 'Felaktig kod' }); /* Translation needed */
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting, submitForm }) => (
            <>
              <Field
                component={TextField}
                fullWidth
                id="loginCode"
                label="Kod" /* Translation needed */
                margin="normal"
                // multiline
                name="loginCode"
                required
                variant="outlined"
              />
              <Button
                color="primary"
                disabled={isSubmitting}
                disableElevation
                fullWidth
                onClick={submitForm}
                type="submit"
                variant="contained"
              >
                {'Logga in' /* Translation needed */}
              </Button>
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
}
