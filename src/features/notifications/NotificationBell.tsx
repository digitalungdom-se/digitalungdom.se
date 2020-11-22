import React, { useEffect, useRef } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import NotificationList from './NotificationList';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { UserNotification } from 'types/notifications';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    transformOrigin: 'top right',
    maxHeight: theme.spacing(40),
    overflow: 'auto',
    width: theme.spacing(40),
  },
  list: {},
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

interface NotificationBellProps {
  getNotifications: (body: { skip: number; limit: number }) => Promise<UserNotification[]>;
  readNotifications: (notifications: string[]) => Promise<void>;
  limit: number;
}

interface NotificationBellState {
  hasMore: boolean;
  notifications: UserNotification[];
  open: boolean;
  unreadNotifications: string[];
}

function NotificationBell(props: NotificationBellProps) {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = React.useState<NotificationBellState>({
    open: false,
    hasMore: true,
    notifications: [],
    unreadNotifications: [],
  });

  function getNotifications() {
    return props
      .getNotifications({
        limit: props.limit,
        skip: state.notifications.length,
      })
      .then((notifications) =>
        setState({
          ...state,
          hasMore: notifications.length === props.limit,
          notifications: notifications.length ? [...state.notifications, ...notifications] : notifications,
          unreadNotifications: [
            ...state.unreadNotifications,
            ...(state.open
              ? []
              : notifications.filter((notification) => !notification.read).map((notification) => notification._id)),
          ],
        }),
      );
  }

  function openNotifications() {
    if (state.open === false && state.unreadNotifications.length)
      props.readNotifications(state.unreadNotifications).then(() => setState({ ...state, unreadNotifications: [] }));
    setState({ ...state, open: !state.open });
  }

  useEffect(() => {
    getNotifications();
  }, []);

  const { open, notifications, unreadNotifications, hasMore } = state;
  const id = open ? 'notifications-popper' : undefined;
  const scrollRef = useRef(null);

  return (
    <>
      <IconButton onClick={openNotifications} ref={anchorRef}>
        <Badge badgeContent={unreadNotifications.length > 9 ? '9+' : unreadNotifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper
        anchorEl={anchorRef.current}
        id={id}
        open={open}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setState({ ...state, open: false });
            }}
          >
            <Grow in={open} {...TransitionProps}>
              <Paper className={classes.paper} ref={scrollRef}>
                {notifications.length === 0 && <div>No notifications</div>}
                <NotificationList
                  className={classes.list}
                  getNotifications={getNotifications}
                  hasMore={hasMore}
                  notifications={notifications}
                  scrollParentRef={scrollRef}
                />
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default NotificationBell;
