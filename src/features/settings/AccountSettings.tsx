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
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    firstName: 'John',
    lastName: 'Smith',
    username: 'johnsmith',
    birthdate: new Date(0),
    gender: 'male',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }): void => {
        const apiValues = {
          name: values.firstName + ' ' + values.lastName,
          username: values.username,
          birthdate: values.birthdate,
          gender: values.gender,
        };
        const array: Array<[string, Record<string, unknown>]> = [];
        for (const [key, value] of Object.entries(apiValues)) {
          array.push(['details.' + key, { [key]: value }]);
        }
        Axios.put('/api/user/set', {
          updates: array,
        })
          .then((res) => {
            console.log(res);
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
                KeyboardButtonProps={{
                  'aria-label': 'change birthdate',
                }}
                disabled={isSubmitting}
                fullWidth
                id="birthdate"
                inputVariant="outlined"
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="undisclosed">Undisclosed</MenuItem>
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
