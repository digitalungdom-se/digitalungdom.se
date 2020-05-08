import 'date-fns';

import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
// import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import MuiTextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
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
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object({
  // birthday: Yup.date().required('Required'),
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

interface NumberFormatCustomProps {
  name: string;
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string; name: string } }) => void;
}

function NumberFormatCustom(props: NumberFormatCustomProps): React.ReactElement {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...props}
      format="####-##-##"
      onValueChange={(values): void => {
        onChange({
          target: {
            name: other.name,
            value: values.value,
          },
        });
      }}
    />
  );
}

interface Props {
  onSuccess: () => void;
}

export default function Register(props: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
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
              // if (moment(values.birthday).isValid() === false) {
              //   setErrors({ birthday: 'invalid date' });
              //   return setSubmitting(false);
              // } else if (moment().diff(values.birthday, 'years') <= 13) {
              //   setErrors({ birthday: 'too young' });
              //   return setSubmitting(false);
              // }
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
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
    </Container>
  );
}
