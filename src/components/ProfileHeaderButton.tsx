import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      height: theme.spacing(7),
      width: theme.spacing(7),
    },
    root: {
      // borderBottom: (props: { open: boolean }): string => (props.open ? '0' : ''),
      borderBottomLeftRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      borderBottomRightRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      //display: 'flex',
      // '& > *': {
      //   margin: theme.spacing(1),
      // },
      transition: '262ms',
      width: theme.spacing(20),
    },
    small: {
      fontSize: 'inherit',
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
      width: theme.spacing(3),
    },
  }),
);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.action.selected,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.text.primary,
      },
    },
  },
}))(MenuItem);

const StyledMenu = withStyles(({ spacing, palette }) => ({
  paper: {
    border: '1px solid',
    borderColor: palette.divider,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: 0,
    width: spacing(20),
  },
}))((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    elevation={0}
    getContentAnchorEl={null}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function ProfileHeaderButton({ firstName }: { firstName: string }): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles({ open: Boolean(anchorEl) });

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        className={classes.root}
        disableElevation
        onClick={handleClick}
        size="large"
        variant="outlined"
      >
        <Avatar className={classes.small}>B</Avatar>
        {firstName}
      </Button>
      <StyledMenu anchorEl={anchorEl} id="customized-menu" keepMounted onClose={handleClose} open={Boolean(anchorEl)}>
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
