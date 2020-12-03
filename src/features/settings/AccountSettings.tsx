import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import BirthdatePicker from 'features/auth/BirthdatePicker';
import Button from '@material-ui/core/Button';
import CheckUsernameTextField from 'features/auth/CheckUsernameTextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField } from 'formik-material-ui';
import { selectMyProfile } from 'features/users/usersSlice';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export const DetailsValidationSchema = Yup.object({
  birthdate: Yup.date().required('Required'),
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  gender: Yup.string().required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  username: Yup.string().required('Required').min(3),
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

function AccountSettings(): React.ReactElement {
  const classes = useStyles();
  const myProfile = useSelector(selectMyProfile);
  const { enqueueSnackbar } = useSnackbar();
  if (myProfile === null) return <div>Loading</div>;
  const initialValues = {
    birthdate: myProfile.details.birthdate,
    firstName: myProfile.details.firstName,
    gender: myProfile.details.gender,
    lastName: myProfile.details.lastName,
    username: myProfile.details.username,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ username, ...values }, { setSubmitting }): void => {
        Axios.put(
          '/user/@me',
          username !== myProfile.details.username
            ? {
                ...values,
                username,
              }
            : values,
        )
          .then((res) => {
            setSubmitting(false);
            enqueueSnackbar('Changes saved!', { variant: 'success' });
          })
          .catch(console.log);
      }}
      validationSchema={DetailsValidationSchema}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={classes.root}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Field
                autoComplete="fname"
                autoFocus
                component={TextField}
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
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
                initialUsername={initialValues.username}
                label="Username"
                name="username"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <BirthdatePicker
                disabled={isSubmitting}
                fullWidth
                id="birthdate"
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change birthdate',
                }}
                label="Birthdate"
                onChange={(value): void => setFieldValue('birthdate', value)}
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
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
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

export default AccountSettings;
