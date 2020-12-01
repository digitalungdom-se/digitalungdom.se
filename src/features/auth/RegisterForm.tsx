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
    .typeError('Invalid date')
    .test('birthdate', 'You need to be at least 13. Send an e-mail to styrelse@digitalungdom.se', function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 13;
    })
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  gender: Yup.string().required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  username: Yup.string().required('Required').min(3),
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
        Sign up
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
              setErrors({ email: 'EMAIL_TAKEN' });
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
                  label="First Name"
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
                  label="Last Name"
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
                  label="Username"
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
                  label="Email Address"
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
                  label="Birthdate"
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
                  label="Gender"
                  name="gender"
                  select // make this field into a select
                  variant="outlined"
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                  <MenuItem value="UNDISCLOSED">Undisclosed</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" required value="allowExtraEmails" />}
                  label={
                    <span>
                      I agree to Digital Ungdom&apos;s terms of service. <RegisterGDPRAgreement />
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
              Sign Up
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
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
