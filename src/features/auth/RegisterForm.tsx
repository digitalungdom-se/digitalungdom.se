import 'date-fns';

import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
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

const validationSchema = Yup.object({
  birthday: Yup.date().required('Required'),
  // source for confirmPassword:  https://codesandbox.io/s/l2r832l8x7
  confirmPassword: Yup.string()
    .required('Required')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
    }),
  email: Yup.string().email('Invalid email address').required('Required'),
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  gender: Yup.string().required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

interface Props {
  onSuccess: () => void;
}

export default function RegisterForm(props: Props): React.ReactElement {
  const classes = useStyles();

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
            birthday: null,
            confirmPassword: '',
            email: '',
            firstName: '',
            gender: '',
            lastName: '',
            password: '',
            username: '',
          }}
          onSubmit={(values, { setErrors, setSubmitting }): void => {
            axios
              .post('/api/user/register', values)
              .then((res) => {
                setSubmitting(false);
                if (res.data) {
                  props.onSuccess();
                }
              })
              .catch((err) => {
                if (!err.status) {
                  alert('Network error');
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
                    disableToolbar
                    format="yyyy-MM-dd"
                    fullWidth
                    id="birthday"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    label="Birthday"
                    onChange={(value): void => setFieldValue('birthday', value)}
                    placeholder="yyyy-mm-dd"
                    required
                    value={values.birthday}
                    variant="inline"
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
                    control={<Checkbox color="primary" value="allowExtraEmails" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
                  <Link href="#" variant="body2">
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
