import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottomLeftRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      borderBottomRightRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      transition: '262ms',
      width: theme.spacing(20),
    },
    avatar: {
      // fontSize: 'inherit',
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
      width: theme.spacing(3),
    },
    item: {
      '&:focus': {
        backgroundColor: theme.palette.action.selected,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.text.primary,
        },
      },
    },
  }),
);

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

export interface ProfileHeaderButtonProps {
  firstName: string;
  logout: () => void;
  username: string;
  avatarSrc?: string;
}

export default function ProfileHeaderButton(props: ProfileHeaderButtonProps): JSX.Element {
  const { firstName, logout, username, avatarSrc } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles({ open: Boolean(anchorEl) });

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const menu = (
    <>
      <MenuItem className={classes.item} component={Link} onClick={handleClose} to={`/@${username}`}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </MenuItem>
      <MenuItem className={classes.item} component={Link} onClick={handleClose} to="/settings/account">
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem
        className={classes.item}
        onClick={(): void => {
          logout();
          handleClose();
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </MenuItem>
    </>
  );

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
        <Avatar className={classes.avatar} src={avatarSrc} />
        {firstName}
      </Button>
      <StyledMenu anchorEl={anchorEl} id="customized-menu" keepMounted onClose={handleClose} open={Boolean(anchorEl)}>
        {menu}
      </StyledMenu>
    </div>
  );
}
