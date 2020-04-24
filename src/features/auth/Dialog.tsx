import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      // padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface CloseButtonProps extends WithStyles<typeof styles> {
  onClose: () => void;
}

const CloseButton = withStyles(styles)((props: CloseButtonProps) => {
  const { classes, onClose } = props;
  return onClose ? (
    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
      <CloseIcon />
    </IconButton>
  ) : null;
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    // marginTop: theme.spacing(5),
    padding: theme.spacing(0),
  },
}))(MuiDialogContent);

export interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function AuthDialog({ open, onClose, children }: Props): React.ReactElement {
  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <CloseButton onClose={onClose} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
