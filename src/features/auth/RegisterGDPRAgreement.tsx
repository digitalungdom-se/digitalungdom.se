import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import React from 'react';

function RegisterGDPRAgreement(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <Link
        color="primary"
        href="#"
        onClick={(event: React.SyntheticEvent) => {
          event.preventDefault();
          handleClickOpen();
        }}
      >
        {'Läs mer.' /* Translation needed */}
      </Link>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Genom att godkänna Digital Ungdoms användarvillkor accepterar du att Digital Ungdom lagrar den information
              du anger på hemsidan. {/* Translation needed */}
            </p>
            <p>
              Du godkänner även att du kommer att följa förenings stadgar, som du kan{' ' /* Translation needed */}
              <Link href="/stadgar.pdf">läsa här.</Link>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            {'Stäng' /* Translation needed */}
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default RegisterGDPRAgreement;
