import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSnackbar } from 'notistack';

export const SecurityValidationSchema = Yup.object({
  password: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('newPassword')], "Passwords don't match"),
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
  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [show, setShow] = React.useState<ShowState>({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleClick = (prop: keyof ShowState) => () => {
    // setValues({ ...values, showPassword: !values.showPassword });
    setShow({ ...show, [prop]: !show[prop] });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }): void => {
        console.log(values);
        const array: Array<[string, Record<string, unknown>]> = [['details.password', values]];
        Axios.put('/api/user/set', {
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
                InputProps={{
                  endAdornment: (
                    <ShowPasswordAdornment onClick={handleClick('password')} showPassword={show.password} />
                  ),
                }}
                autoComplete="password"
                autoFocus
                component={TextField}
                fullWidth
                id="password"
                label="Current password"
                name="password"
                type={show.password ? 'text' : 'password'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                InputProps={{
                  endAdornment: (
                    <ShowPasswordAdornment onClick={handleClick('newPassword')} showPassword={show.newPassword} />
                  ),
                }}
                autoComplete="newPassword"
                component={TextField}
                fullWidth
                id="newPassword"
                label="New password"
                name="newPassword"
                type={show.newPassword ? 'text' : 'password'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                InputProps={{
                  endAdornment: (
                    <ShowPasswordAdornment
                      onClick={handleClick('confirmPassword')}
                      showPassword={show.confirmPassword}
                    />
                  ),
                }}
                autoComplete="confirmPassword"
                component={TextField}
                fullWidth
                id="confirmPassword"
                label="Confirm new password"
                name="confirmPassword"
                type={show.confirmPassword ? 'text' : 'password'}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            disableElevation
            disabled={isSubmitting}
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

interface ShowPasswordAdornmentProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  showPassword?: boolean;
}

function ShowPasswordAdornment(props: ShowPasswordAdornmentProps): React.ReactElement {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={props.onClick}
        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
      >
        {props.showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

export default SecuritySettings;
