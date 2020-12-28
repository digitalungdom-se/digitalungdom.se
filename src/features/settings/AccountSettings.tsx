import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { selectMyProfile, updateMyDetails } from 'features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

import Axios from 'axios';
import BirthdatePicker from 'features/auth/BirthdatePicker';
import Button from '@material-ui/core/Button';
import CheckUsernameTextField from 'features/auth/CheckUsernameTextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

export const DetailsValidationSchema = Yup.object({
  birthdate: Yup.date().required('Obligatoriskt') /* Translation needed */,
  firstName: Yup.string().max(15, 'Får vara max 15 karaktärer').required('Obligatoriskt') /* Translation needed */,
  gender: Yup.string().required('Obligatoriskt') /* Translation needed */,
  lastName: Yup.string().max(20, 'Får vara max 20 karaktärer').required('Obligatoriskt') /* Translation needed */,
  username: Yup.string().required('Obligatoriskt').min(3, 'Måste vara minst 3 karaktärer') /* Translation needed */,
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
  const dispatch = useDispatch();
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
            enqueueSnackbar('Sparade ändringar!', { variant: 'success' }) /* Translation needed */;
            dispatch(updateMyDetails({ ...values, username, _id: myProfile._id }));
          })
          .catch(console.error);
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
                label="Förnamn" /* Translation needed */
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
                label="Efternamn" /* Translation needed */
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
                label="Användarnamn" /* Translation needed */
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
                label="Födelsedatum" /* Translation needed */
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
                label="Könsidentitet" /* Translation needed */
                name="gender"
                select // make this field into a select
                variant="outlined"
              >
                <MenuItem value="MALE">{'Man' /* Translation needed */}</MenuItem>
                <MenuItem value="FEMALE">{'Kvinna' /* Translation needed */}</MenuItem>
                <MenuItem value="OTHER">{'Annat' /* Translation needed */}</MenuItem>
                <MenuItem value="UNDISCLOSED">{'Vill ej uppge' /* Translation needed */}</MenuItem>
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
            {'Spara information' /* Translation needed */}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AccountSettings;
