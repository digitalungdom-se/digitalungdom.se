import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      borderBottomLeftRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      borderBottomRightRadius: (props: { open: boolean }): string => (props.open ? '0' : ''),
      transition: '262ms',
    },
    root: {
      maxWidth: theme.spacing(20),
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(12),
      },
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
    width: '100%',
    maxWidth: 'unset',
  },
}))((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    elevation={0}
    getContentAnchorEl={null}
    PopoverClasses={props.classes}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export interface ProfileHeaderButtonProps {
  firstName: string;
  lastName: string;
  logout: () => void;
  username: string;
  avatarSrc?: string;
  loading?: boolean;
}

export default function ProfileHeaderButton(props: ProfileHeaderButtonProps): JSX.Element {
  const { firstName, lastName, logout, username, avatarSrc } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles({ open: Boolean(anchorEl) });

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const anchorElement = React.useRef<HTMLDivElement>(null);

  return (
    <div className={classes.root} ref={anchorElement}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        className={classes.button}
        disableElevation
        fullWidth
        onClick={handleClick}
        size="large"
        variant="outlined"
      >
        {props.loading ? (
          <>
            <Skeleton className={classes.avatar} variant="circle" />
            <Hidden smDown>
              <div style={{ flexGrow: 1 }}>
                <Skeleton variant="text" />
              </div>
            </Hidden>
          </>
        ) : (
          <>
            <Avatar className={classes.avatar} src={avatarSrc} />
            <Hidden smUp>{firstName[0] + lastName[0]}</Hidden>
            <Hidden smDown>{firstName}</Hidden>
          </>
        )}
      </Button>
      <StyledMenu
        anchorEl={anchorElement.current}
        id="customized-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        style={{ width: anchorElement.current?.offsetWidth }}
      >
        <MenuItem className={classes.item} component={Link} onClick={handleClose} to={`/@${username}`}>
          <Hidden smDown>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
          </Hidden>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem className={classes.item} component={Link} onClick={handleClose} to="/settings/account">
          <Hidden smDown>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
          </Hidden>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem
          className={classes.item}
          onClick={(): void => {
            logout();
            handleClose();
          }}
        >
          <Hidden smDown>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
          </Hidden>
          <ListItemText primary="Log out" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
