import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { Icon } from '@iconify/react';
import IconButton from '@material-ui/core/IconButton';
import NotificationList from './NotificationList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { UserNotification } from 'types/notifications';

const styles = (theme: Theme) => ({
  paper: {
    transformOrigin: 'top right',
    height: theme.spacing(40),
    width: theme.spacing(40),
  },
});

interface NotificationBellProps extends WithStyles<typeof styles> {
  getNotifications: (body: { skip: number; limit: number }) => Promise<UserNotification[]>;
  readNotifications: (notifications: string[]) => Promise<void>;
  deleteNotifications: (notifications: string[]) => Promise<void>;
  limit: number;
}

interface NotificationBellState {
  hasMore: boolean;
  notifications: UserNotification[];
  open: boolean;
  unreadNotifications: string[];
}

class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
  private anchorRef = React.createRef<HTMLButtonElement>();
  constructor(props: NotificationBellProps) {
    super(props);
    this.state = {
      open: false,
      hasMore: true,
      notifications: [],
      unreadNotifications: [],
    };
    this.openNotifications = this.openNotifications.bind(this);
    this.deleteNotifications = this.deleteNotifications.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
  }

  getNotifications() {
    return this.props
      .getNotifications({
        limit: this.props.limit,
        skip: this.state.notifications.length,
      })
      .then((notifications) => {
        this.setState({
          ...this.state,
          hasMore: notifications.length === this.props.limit,
          notifications: notifications.length ? [...this.state.notifications, ...notifications] : notifications,
          unreadNotifications: [
            ...this.state.unreadNotifications,
            ...(this.state.open
              ? []
              : notifications.filter((notification) => !notification.read).map((notification) => notification._id)),
          ],
        });
        if (this.state.open) this.readNotifications();
      });
  }

  componentDidMount() {
    this.getNotifications();
  }

  readNotifications() {
    if (this.state.unreadNotifications.length)
      this.props
        .readNotifications(this.state.unreadNotifications)
        .then(() => this.setState({ ...this.state, unreadNotifications: [] }));
  }

  deleteNotifications(selected: string[]) {
    return this.props.deleteNotifications(selected).then(() =>
      this.setState({
        ...this.state,
        notifications: this.state.notifications.filter((notification) => selected.indexOf(notification._id) === -1),
      }),
    );
  }

  openNotifications() {
    if (!this.state.open) this.readNotifications();
    this.setState({ ...this.state, open: !this.state.open });
  }

  render() {
    const { open, notifications, unreadNotifications, hasMore } = this.state;
    const id = open ? 'notifications-popper' : undefined;
    return (
      <>
        <IconButton onClick={this.openNotifications} ref={this.anchorRef}>
          <Badge badgeContent={unreadNotifications.length > 9 ? '9+' : unreadNotifications.length} color="secondary">
            <Icon icon="material-symbols:notifications-rounded" />
          </Badge>
        </IconButton>
        <Popper
          anchorEl={this.anchorRef.current}
          id={id}
          open={open}
          placement="bottom-end"
          style={{ zIndex: 1300 }}
          transition
        >
          {({ TransitionProps }) => (
            <ClickAwayListener
              onClickAway={() => {
                this.setState({ ...this.state, open: false });
              }}
            >
              <Grow in={open} {...TransitionProps}>
                <Paper className={this.props.classes.paper}>
                  <NotificationList
                    deleteNotifications={this.deleteNotifications}
                    getNotifications={this.getNotifications}
                    hasMore={hasMore}
                    notifications={notifications}
                  />
                </Paper>
              </Grow>
            </ClickAwayListener>
          )}
        </Popper>
      </>
    );
  }
}

export default withStyles(styles)(NotificationBell);
