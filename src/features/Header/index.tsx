import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { selectAuthenticated, selectMyProfile } from 'features/auth/authSlice';

import AppBar from '@material-ui/core/AppBar';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileHeaderButton from 'components/ProfileHeaderButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UnauthenticatedHeaderButtons from './UnauthenticatedHeaderButtons';
import { failAuthorize } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
    login: {
      marginRight: theme.spacing(2),
    },
  }),
);

const ConnectedProfileHeaderButton = () => {
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useDispatch();

  return (
    <ProfileHeaderButton
      logout={() => {
        Axios.delete('/api/user/logout')
          .then((res) => {
            if (res.data.type === 'fail') throw res;
            dispatch(failAuthorize());
          })
          .catch((err) => {
            console.error('Could not delete session, but deleted session locally');
            dispatch(failAuthorize());
          });
      }}
      name={myProfile.name}
      username={myProfile.username}
    />
  );
};

function Header(): JSX.Element {
  const classes = useStyles();
  const authenticated = useSelector(selectAuthenticated);

  return (
    <AppBar className={classes.root} color="inherit" position="sticky">
      <Toolbar>
        <Typography className={classes.title} component="h1" style={{ fontWeight: 600, color: "#1e6ee8" }} variant="h6">
          <Link to="/">Digital Ungdom</Link>
        </Typography>
        {!authenticated ? <UnauthenticatedHeaderButtons /> : <ConnectedProfileHeaderButton />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
