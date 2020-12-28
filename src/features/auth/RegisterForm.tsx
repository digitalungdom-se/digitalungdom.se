import 'date-fns';

import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';

import { AuthPage } from './authSlice';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';
import BirthdatePicker from './BirthdatePicker';
import Button from '@material-ui/core/Button';
import CheckUsernameTextField from './CheckUsernameTextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import RegisterGDPRAgreement from './RegisterGDPRAgreement';
import { RegisterProps } from './Register';
import { Link as RouterLink } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import differenceInYears from 'date-fns/differenceInYears';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    width: '100%',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterValidationSchema = Yup.object({
  birthdate: Yup.date()
    .typeError('Ogiltigt datum') /* Translation needed */
    .test(
      'birthdate',
      'Du måste vara minst 13 år. Skicka ett e-mail till styrelse@digitalungdom.se för info' /* Translation needed */,
      function (value) {
        return differenceInYears(new Date(), new Date(value)) >= 13;
      },
    )
    .required('Obligatoriskt') /* Translation needed */,
  email: Yup.string().email('Ogiltig e-mailaddress').required('Obligatoriskt') /* Translation needed */,
  firstName: Yup.string().max(15, 'Får max vara 15 karaktärer').required('Obligatoriskt') /* Translation needed */,
  gender: Yup.string().required('Obligatoriskt') /* Translation needed */,
  lastName: Yup.string().max(20, 'Får max vara 20 karaktärer').required('Obligatoriskt') /* Translation needed */,
  username: Yup.string().required('Obligatoriskt').min(3, 'Måste minst vara 3 karaktärer') /* Translation needed */,
});

interface FormValues {
  birthdate: Date | null;
  email: string;
  firstName: string;
  gender: '' | 'male' | 'female' | 'other' | 'undisclosed';
  lastName: string;
  username: string;
}

export default function RegisterForm({ redirect = (s: AuthPage) => {}, ...props }: RegisterProps): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {'Bli medlem' /* Translation needed */}
      </Typography>
      <Formik
        initialValues={{
          birthdate: null,
          email: '',
          firstName: '',
          gender: '',
          lastName: '',
          username: '',
        }}
        onSubmit={(values: FormValues, { setErrors, setSubmitting }): void => {
          let birthdate;
          if (values.birthdate !== null) {
            birthdate = values.birthdate.toISOString().substring(0, 10);
          }
          Axios.post('/user/register', {
            ...values,
            birthdate,
          })
            .then((res) => {
              setSubmitting(false);
              Axios.post('/user/auth/email/send_code', { email: values.email })
                .then(() => {
                  setSubmitting(false);
                  props.onSuccess(values.email);
                })
                .catch(() => {
                  setSubmitting(false);
                });
            })
            .catch((err) => {
              setErrors({ email: 'E-mailadressen är redan registrerad' }) /* Translation needed */;
              setSubmitting(false);
            });
        }}
        validationSchema={RegisterValidationSchema}
      >
        {({ touched, values, setFieldValue, isSubmitting, errors, setFieldTouched }) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Field
                  autoComplete="fname"
                  // autoFocus
                  component={TextField}
                  fullWidth
                  id="firstName"
                  label="Förnamn" /* Translation needed */
                  name="firstName"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  autoComplete="lname"
                  component={TextField}
                  fullWidth
                  id="lastName"
                  label="Efternamn" /* Translation needed */
                  name="lastName"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  autoComplete="username"
                  component={CheckUsernameTextField}
                  fullWidth
                  id="username"
                  label="Användarnamn" /* Translation needed */
                  name="username"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  autoComplete="email"
                  component={TextField}
                  fullWidth
                  id="email"
                  label="E-mailadress" /* Translation needed */
                  name="email"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <BirthdatePicker
                  disabled={isSubmitting}
                  error={Boolean(errors.birthdate && touched.birthdate)}
                  fullWidth
                  helperText={touched.birthdate && errors.birthdate}
                  id="birthdate"
                  inputVariant="outlined"
                  KeyboardButtonProps={{
                    'aria-label': 'change birthdate',
                  }}
                  label="Födelsedatum" /* Translation needed */
                  onBlur={() => setFieldTouched('birthdate', true, true)}
                  onChange={(value): void => {
                    setFieldValue('birthdate', value, false);
                  }}
                  required
                  value={values.birthdate}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField} // imported from formik-material-ui
                  fullWidth
                  id="gender"
                  label="Könsidentitet" /* Translation needed */
                  name="gender"
                  select // make this field into a select
                  variant="outlined"
                >
                  <MenuItem value="MALE">{'Man' /* Translation needed */}</MenuItem>
                  <MenuItem value="FEMALE">{'Kvinna' /* Translation needed */}</MenuItem>
                  <MenuItem value="OTHER">{'Annat' /* Translation needed */}</MenuItem>
                  <MenuItem value="UNDISCLOSED">{'Vill ej uppge' /* Translation needed */}</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" required value="allowExtraEmails" />}
                  label={
                    <span>
                      {"Jag godkänner Digital Ungdom's användarvillkor." /* Translation needed */}{' '}
                      <RegisterGDPRAgreement />
                    </span>
                  }
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              color="primary"
              disableElevation
              fullWidth
              type="submit"
              variant="contained"
            >
              {'Bli medlem' /* Translation needed */}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  component={RouterLink}
                  onClick={(e: React.SyntheticEvent): void => {
                    if (props.isDialog) {
                      e.preventDefault();
                      redirect('LOGIN');
                    }
                  }}
                  to="logga-in"
                  variant="body2"
                >
                  {'Har du redan ett konto? Logga in!' /* Translation needed */}
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
