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

export interface ProfileHeaderButtonProps {
  name: string;
  logout: () => void;
  username: string;
}

export default function ProfileHeaderButton(props: ProfileHeaderButtonProps): JSX.Element {
  const { name, logout, username } = props;

  const splittedName = name.split(' ');
  const firstName = splittedName[0];

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
        <Avatar className={classes.avatar}>
          <PersonIcon fontSize="small" />
        </Avatar>
        {firstName}
      </Button>
      <StyledMenu anchorEl={anchorEl} id="customized-menu" keepMounted onClose={handleClose} open={Boolean(anchorEl)}>
        <Link
          style={{
            color: 'inherit',
            textDecoration: 'none',
          }}
          to={`/@${username}`}
        >
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem
          onClick={(): void => {
            logout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
