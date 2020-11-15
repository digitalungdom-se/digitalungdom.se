import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { TextField } from 'formik-material-ui';
import { selectMyProfile } from 'features/users/usersSlice';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export const SecurityValidationSchema = Yup.object({
  confirmEmail: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('email')], "Email addresses don't match"),
  email: Yup.string().required('Required'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
      width: '100%',
    },
    submit: {
      margin: theme.spacing(3, 0, 0),
    },
  }),
);

type FieldsName = 'firstName' | 'lastName' | 'username' | 'birthdate' | 'gender';

interface ShowState {
  password: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

function SecuritySettings(): React.ReactElement {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const myProfile = useSelector(selectMyProfile);
  if (myProfile === null) return <div>Loading</div>;
  const initialValues = {
    confirmEmail: '',
    email: myProfile.details.email.raw,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }): void => {
        console.log(values);
        const array: Array<[string, Record<string, unknown>]> = [['details.password', values]];
        Axios.put('/user', {
          updates: array,
        })
          .then((res) => {
            setSubmitting(false);
            enqueueSnackbar('Changes saved!', { variant: 'success' });
          })
          .catch(console.log);
      }}
      validationSchema={SecurityValidationSchema}
    >
      {({ values, isSubmitting }) => (
        <Form className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                autoComplete="email"
                component={TextField}
                fullWidth
                id="email"
                label="New Email Address"
                name="email"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                autoComplete="confirmEmail"
                component={TextField}
                fullWidth
                id="confirmEmail"
                label="Confirm New Email Address"
                name="confirmEmail"
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            disabled={isSubmitting}
            disableElevation
            fullWidth
            type="submit"
            variant="contained"
          >
            Save information
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SecuritySettings;
