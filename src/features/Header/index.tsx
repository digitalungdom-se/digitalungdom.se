import { Link, useLocation } from 'react-router-dom';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Axios from 'axios';
import CenterWrapper from 'components/CenterWrapper';
import DarkIcon from '@material-ui/icons/Brightness4';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LightIcon from '@material-ui/icons/Brightness7';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationBell from 'features/notifications/NotificationBell';
import ProfileHeaderButton from 'components/ProfileHeaderButton';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TokenStorage } from 'utils/tokenInterceptor';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UnauthenticatedHeaderButtons from './UnauthenticatedHeaderButtons';
import { UserNotification } from 'types/notifications';
import head from 'resources/head.svg';
import { mongoIdToDate } from 'utils/mongoid';
import { selectAuthenticated } from 'features/auth/authSlice';
import { selectMyProfile } from 'features/users/usersSlice';
import useDarkMode from 'use-dark-mode';
import { useSelector } from 'react-redux';

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
    tab: theme.mixins.toolbar,
    menuButton: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const StyledTab = withStyles({
  root: {
    minWidth: 80,
    textTransform: 'none',
  },
  selected: {},
})((props: any) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles((theme: Theme) => ({
  indicator: {
    backgroundColor: theme.palette.type === 'dark' ? 'white' : theme.palette.primary.main,
  },
}))(Tabs);

const ConnectedProfileHeaderButton = () => {
  const myProfile = useSelector(selectMyProfile);

  return (
    <ProfileHeaderButton
      avatarSrc={`${Axios.defaults.baseURL}/user/${myProfile?._id}/profile_picture`}
      firstName={myProfile?.details.firstName || ''}
      lastName={myProfile?.details.lastName || ''}
      loading={myProfile === null}
      logout={() => TokenStorage.clear()}
      username={myProfile?.details.username || ''}
    />
  );
};

const links = ['/om-oss', '/agora'];

function Header(): JSX.Element {
  const classes = useStyles();
  const authenticated = useSelector(selectAuthenticated);
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const labels = ['Om oss', 'Agora'];
  const { toggle, value } = useDarkMode();

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
            {labels.map((text, index) => (
              <ListItem button component={RouterLink} key={text} onClick={handleDrawerToggle} to={links[index]}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={toggle}>
              <ListItemIcon>{value ? <LightIcon /> : <DarkIcon />}</ListItemIcon>
              <ListItemText primary={value ? 'Ljust läge' : 'Mörkt läge'} />
            </ListItem>
            <Divider />
            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
              {!authenticated && <UnauthenticatedHeaderButtons />}
            </ListItem>
          </List>
        }
      </Drawer>
      <AppBar className={classes.root} color="inherit" position="sticky">
        <CenterWrapper>
          <Toolbar disableGutters>
            <Typography className={classes.title} component="h1" style={{ fontWeight: 600 }} variant="h6">
              <Link to="/">
                <img
                  alt="Logo depicting Boten Anna"
                  src={head}
                  style={{ marginRight: 4, verticalAlign: 'middle' }}
                  width={50}
                />
              </Link>
              <Link to="/">Digital Ungdom</Link>
            </Typography>
            <Hidden smDown>
              <StyledTabs
                style={{ marginRight: 12 }}
                value={links.indexOf(pathname) !== -1 ? links.indexOf(pathname) : false}
              >
                <StyledTab className={classes.tab} component={RouterLink} label="Om oss" to="/om-oss" />
                <StyledTab className={classes.tab} component={RouterLink} label="Agora" to="/agora" />
              </StyledTabs>
              {!authenticated && <UnauthenticatedHeaderButtons />}
              {<IconButton onClick={toggle}>{value ? <LightIcon /> : <DarkIcon />}</IconButton>}
            </Hidden>
            {authenticated && (
              <NotificationBell
                deleteNotifications={(notifications: string[]) =>
                  Axios.delete('/notification', { data: notifications })
                }
                getNotifications={(params: { skip: number; limit: number }): Promise<UserNotification[]> =>
                  new Promise((resolve, reject) =>
                    Axios.get<UserNotification[]>('/notification', { params })
                      .then((res) =>
                        resolve(
                          res.data.map((notification) => ({
                            ...notification,
                            at: mongoIdToDate(notification._id),
                            link: `/agora/p/${notification.data.post}${
                              notification.data.comment ? '/' + notification.data.comment : ''
                            }`,
                          })),
                        ),
                      )
                      .catch(console.error),
                  )
                }
                limit={10}
                readNotifications={(notifications: string[]) => Axios.put('/notification', { body: notifications })}
              />
            )}
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
        </CenterWrapper>
      </AppBar>
    </>
  );
}

export default Header;
