import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { authorize } from './authSlice';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${require('resources/images/about1.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface CodeMap {
  [index: string]: string;
}

const ERROR_CODES_MAP: CodeMap = {
  NO_ACCOUNT: 'identifier',
  INCORRECT_PASSWORD: 'password',
};

interface Props {
  onSuccess: () => void;
}

export default function Login(props: Props): React.ReactElement {
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
            initialValues={{ identifier: '', password: '' }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              axios
                .post('/api/user/login', {
                  username: values.identifier,
                  password: values.password,
                })
                .then((res) => {
                  setSubmitting(false);
                  if (res.data.type === 'fail') throw res;
                  dispatch(authorize(res.data));
                  props.onSuccess();
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
              identifier: Yup.string().required('Obligatoriskt fält'),
              password: Yup.string().required('Obligatoriskt fält'),
            })}
          >
            {({ values, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={TextField}
                  fullWidth
                  id="identifier"
                  label="Email address or username"
                  margin="normal"
                  name="identifier"
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
                      Glömt lösenordet?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
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
