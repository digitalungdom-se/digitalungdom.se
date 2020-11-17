import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';

import AuthPageProps from './authPageProps';
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
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Login({
  onSuccess,
  isDialog = false,
  redirect = (): void => {},
}: AuthPageProps): React.ReactElement {
  const classes = useStyles();

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
              // password: '',
              email: '',
            }}
            onSubmit={(values, { setSubmitting, setErrors }): void => {
              axios
                .post('/user/auth/email/send_code', values)
                .then((res) => {
                  setSubmitting(false);
                  onSuccess(values.email);
                })
                .catch((err) => {
                  setErrors({ email: 'NO_USER' });
                  setSubmitting(false);
                });
            }}
            validationSchema={Yup.object({
              email: Yup.string().email().required('Required'),
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
                  id="email"
                  label="Email"
                  margin="normal"
                  name="email"
                  required
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
