import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';

import { AuthViewsProps } from './authViewsTypes';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { TranslatedTextField as TextField } from 'components/TranslatedTextField';
// import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { authorize } from './authSlice';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
  },
  image: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundImage: `url(${require('resources/images/about1.png')})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(8, 4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface CodeMap {
  [index: string]: string;
}

const ERROR_CODES_MAP: CodeMap = {
  INCORRECT_PASSWORD: 'password',
  NO_ACCOUNT: 'username',
  NOT_VERIFIED: 'username',
};

export default function Login({
  onSuccess,
  isDialog = false,
  redirect = (): void => {},
}: AuthViewsProps): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid component="main" container>
      <Grid className={classes.image} item md={5} sm={4} xs={false} />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logga in
          </Typography>
          <Formik
            initialValues={{
              password: '',
              username: '',
            }}
            onSubmit={(values, { setSubmitting, setErrors }): void => {
              axios
                .post('/api/user/login', values)
                .then((res) => {
                  setSubmitting(false);
                  if (res.data.type === 'fail') throw res;
                  dispatch(authorize(res.data));
                  onSuccess();
                })
                .catch((err) => {
                  if (err.data) {
                    const errors = err.data.errors;
                    errors.forEach((error: { message: string }) => {
                      setErrors({ [ERROR_CODES_MAP[error.message]]: error.message });
                    });
                  }
                  setSubmitting(false);
                });
            }}
            validationSchema={Yup.object({
              password: Yup.string().required('Required'),
              username: Yup.string().required('Required'),
            })}
          >
            {({ isSubmitting, errors }): React.ReactElement => (
              <Form className={classes.form}>
                <Field
                  aria-describedby="birthday-text"
                  // autoFocus
                  autoComplete="email"
                  component={TextField}
                  fullWidth
                  id="username"
                  label="Email address or username"
                  margin="normal"
                  name="username"
                  required
                  variant="outlined"
                />
                <Field
                  autoComplete="current-password"
                  component={TextField}
                  fullWidth
                  id="password"
                  label="Password"
                  margin="normal"
                  name="password"
                  required
                  type="password"
                  variant="outlined"
                />
                <Button
                  className={classes.submit}
                  color="primary"
                  disabled={isSubmitting}
                  disableElevation
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Logga in
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Kan du inte logga in?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={(e: React.SyntheticEvent): void => {
                        if (isDialog) {
                          e.preventDefault();
                          redirect('REGISTER');
                        }
                      }}
                      variant="body2"
                    >
                      Inget konto? Bli medlem!
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Grid>
  );
}
