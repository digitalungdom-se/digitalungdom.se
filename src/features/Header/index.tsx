import { Link, useLocation } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileHeaderButton from 'components/ProfileHeaderButton';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TokenStorage } from 'utils/tokenInterceptor';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UnauthenticatedHeaderButtons from './UnauthenticatedHeaderButtons';
import head from 'resources/head.svg';
import { selectAuthenticated } from 'features/auth/authSlice';
import { selectMyProfile } from 'features/users/usersSlice';
import { useSelector } from 'react-redux';

// import List from '@material-ui/core/List'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerList: {
      paddingTop: 56,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        paddingTop: 48,
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    title: {
      flexGrow: 1,
      color: theme.palette.type === 'dark' ? 'white' : theme.palette.primary.main,
      alignItems: 'center',
      display: 'flex',
    },
    login: {
      marginRight: theme.spacing(2),
    },
    tabs: theme.mixins.toolbar,
    menuButton: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const ConnectedProfileHeaderButton = () => {
  const myProfile = useSelector(selectMyProfile);

  return (
    <ProfileHeaderButton
      avatarSrc={`${Axios.defaults.baseURL}/user/${myProfile?._id}/profile_picture?size=24`}
      firstName={myProfile?.details.firstName || ''}
      logout={() => TokenStorage.clear()}
      username={myProfile?.details.username || ''}
    />
  );
};

const links = ['/about', '/agora'];

function Header(): JSX.Element {
  const classes = useStyles();
  const authenticated = useSelector(selectAuthenticated);
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const labels = ['About us', 'Agora'];

  return (
    <>
      <Drawer
        anchor="top"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={handleDrawerToggle}
        open={mobileOpen}
        style={{ zIndex: 1200 }}
      >
        {
          <List className={classes.drawerList}>
            {!authenticated && <UnauthenticatedHeaderButtons listItems />}
            <Divider />
            {labels.map((text, index) => (
              <ListItem button component={RouterLink} key={text} onClick={handleDrawerToggle} to={links[index]}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        }
      </Drawer>
      <AppBar className={classes.root} color="inherit" position="sticky">
        <Toolbar>
          <Typography className={classes.title} component="h1" style={{ fontWeight: 600 }} variant="h6">
            <Link to="/">
              <img alt="Logo depicting Boten Anna" src={head} style={{ verticalAlign: 'middle' }} width={50} />
            </Link>
            <Link to="/">Digital Ungdom</Link>
          </Typography>
          <Hidden smDown>
            <Tabs value={links.indexOf(pathname) !== -1 ? links.indexOf(pathname) : false}>
              <Tab className={classes.tabs} component={RouterLink} label="About us" to="/about" />
              <Tab className={classes.tabs} component={RouterLink} label="Agora" to="/agora" />
            </Tabs>
            {!authenticated && <UnauthenticatedHeaderButtons />}
          </Hidden>
          {authenticated && <ConnectedProfileHeaderButton />}
          <IconButton
            aria-label="open drawer"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
