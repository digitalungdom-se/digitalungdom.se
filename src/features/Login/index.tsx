import { Field, Form, Formik } from 'formik';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Login() {
  const classes = useStyles();

  return (
    <Grid component="main" container>
      <Grid className={classes.image} item md={5} sm={4} xs={false} />
      <Grid item md={7} sm={8} xs={12}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logga in
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={TextField}
                  fullWidth
                  id="email"
                  label="Email Address"
                  margin="normal"
                  name="email"
                  required
                  type="email"
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
      </Grid>
    </Grid>
  );
}
