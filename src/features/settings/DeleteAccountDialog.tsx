import { Field, Form, Formik } from 'formik';
import { Theme, withStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { TextField } from 'formik-material-ui';
import { TokenStorage } from 'utils/tokenInterceptor';
import { selectMyProfile } from 'features/users/usersSlice';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const RedButton = withStyles((theme: Theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:disabled': {
      color: 'rgba(255,255,255,0.8)',
    },
  },
}))(Button);

export default function DeleteAccountDialog() {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const myProfile = useSelector(selectMyProfile);
  if (myProfile === null) return <div>Laddar...</div>;

  return (
    <div>
      <RedButton disableElevation fullWidth onClick={handleClickOpen} startIcon={<DeleteIcon />} variant="outlined">
        {'Ta bort konto' /* Translation needed */}
      </RedButton>
      <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open={open}>
        <DialogTitle id="form-dialog-title">{'Ta bort konto för evigt' /* Translation needed */}</DialogTitle>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { setSubmitting, setErrors }): void => {
            // setSubmitting(true);
            console.log(myProfile.details.email.raw, values.email);
            if (myProfile.details.email.raw !== values.email) {
              setErrors({ email: 'Du har inte skrivit in korrekt e-mail.' });
              setSubmitting(false);
            } else {
              Axios.delete('/user/@me')
                .then(() => {
                  setSubmitting(false);
                  enqueueSnackbar('Tog bort konto!', { variant: 'success' }); /* Translation needed */
                  TokenStorage.clear();
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Om du tar bort ditt konto så kommer vi inte att kunna återställa det. Var god skriv in din emailadress
                  för att bekräfta
                  {/* Translation needed */}
                </DialogContentText>
                <Field
                  component={TextField}
                  fullWidth
                  id="email"
                  label="E-mailadress"
                  name="email"
                  required
                  // type="email"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button color="primary" disabled={isSubmitting} onClick={handleClose}>
                  {'Avbryt' /* Translation needed */}
                </Button>
                <RedButton color="primary" disabled={isSubmitting} type="submit">
                  {'Ta bort konto för evigt' /* Translation needed */}
                </RedButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
