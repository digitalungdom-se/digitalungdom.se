import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { selectMyProfile } from 'features/users/usersSlice';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export const SecurityValidationSchema = Yup.object({
  confirmEmail: Yup.string()
    .required('Obligatoriskt') /* Translation needed */
    .oneOf([Yup.ref('email')], 'E-mailadresserna stämmer inte överrens') /* Translation needed */,
  email: Yup.string().required('Obligatoriskt') /* Translation needed */,
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

export function SecuritySettingsEmail(): React.ReactElement {
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
            enqueueSnackbar('Sparade ändringar!', { variant: 'success' }); /* Translation needed */
          })
          .catch(console.error);
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
                label="Ny e-mailadress" /* Translation needed */
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
                label="Bekräfta ny e-mailadress" /* Translation needed */
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
            {'Spara information' /* Translation needed */}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const SecuritySettings = () => (
  <div>
    <Typography>
      I nuläget finns det inget sätt att ändra e-mailadress. Om du vill ändra den så får du mer än gärna kontakta{' '}
      <Link href="mailto:styrelse@digitalungdom.se">styrelse@digitalungdom.se</Link>
    </Typography>
  </div>
);

export default SecuritySettings;
