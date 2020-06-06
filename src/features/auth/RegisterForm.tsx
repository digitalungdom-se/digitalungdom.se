import 'date-fns';

import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { AuthViews } from './authViewsTypes';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
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
import debounce from 'lodash.debounce';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

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

const validationSchema = Yup.object({
  birthdate: Yup.date().required('Required'),
  // source for confirmPassword:  https://codesandbox.io/s/l2r832l8x7
  confirmPassword: Yup.string()
    .required('Required')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
    }),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .test(
      'checkDuplEmail',
      'same email exists',
      debounce(async function (email) {
        if (Boolean(email) === false) return;
        return await Axios.get('/api/user/validate/email', { params: { email } })
          .then((res) => {
            return res.data.email;
          })
          .catch(() => {
            // if network fails, return that the email is available
            return true;
          });
      }, 300),
    ),
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  gender: Yup.string().required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  password: Yup.string().required('Required'),
  /** Sources for async validation:
   * https://stackoverflow.com/questions/56277227
   * https://stackoverflow.com/questions/55811114
   */
  username: Yup.string()
    .required('Required')
    .min(3)
    .test(
      'checkDuplUsername',
      'same name exists',
      debounce(async function (username) {
        if (Boolean(username) === false) return;
        return await Axios.get('/api/user/validate/username', { params: { username } })
          .then((res) => {
            return res.data.username;
          })
          .catch(() => {
            // if network fails, return that the username is available
            return true;
          });
      }, 300),
    ),
});

interface FormValues {
  birthdate: Date | null;
  confirmPassword: string;
  email: string;
  firstName: string;
  gender: '' | 'male' | 'female' | 'other' | 'undisclosed';
  lastName: string;
  password: string;
  username: string;
}

export default function RegisterForm({ redirect = (s: AuthViews) => {}, ...props }: RegisterProps): React.ReactElement {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={{
            birthdate: null,
            confirmPassword: '',
            email: '',
            firstName: '',
            gender: '',
            lastName: '',
            password: '',
            username: '',
          }}
          onSubmit={(values: FormValues, { setErrors, setSubmitting }): void => {
            let birthdate;
            if (values.birthdate !== null) {
              birthdate = values.birthdate.toISOString().substring(0, 10);
            }
            Axios.post('/api/user/register', {
              ...values,
              birthdate,
              name: values.firstName + ' ' + values.lastName,
              gender: ['male', 'female', 'other', 'undisclosed'].indexOf(values.gender),
            })
              .then((res) => {
                setSubmitting(false);
                if (res.data) {
                  props.onSuccess();
                }
              })
              .catch((err) => {
                setSubmitting(false);
                if (!err.status) {
                  enqueueSnackbar('Network error!', { variant: 'error' });
                }
              });
          }}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, isSubmitting }) => (
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
                    component={TextField}
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
                  <KeyboardDatePicker
                    disabled={isSubmitting}
                    format="yyyy-MM-dd"
                    fullWidth
                    id="birthdate"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    label="Birthdate"
                    onChange={(value): void => setFieldValue('birthdate', value)}
                    placeholder="yyyy-mm-dd"
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
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="undisclosed">Undisclosed</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    autoComplete="current-password"
                    component={TextField}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    required
                    type="password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    autoComplete="confirmPassword"
                    component={TextField}
                    fullWidth
                    id="confirmPassword"
                    label="Confirm password"
                    name="confirmPassword"
                    required
                    type="password"
                    variant="outlined"
                  />
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
      </MuiPickersUtilsProvider>
    </div>
  );
}
