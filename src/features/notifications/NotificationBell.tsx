import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationList from './NotificationList';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { UserNotification } from 'types/notifications';

interface NotificationBellProps {
  getNotifications: (body: { skip: number; limit: number }) => Promise<UserNotification[]>;
  readNotifications: (notifications: string[]) => Promise<void>;
  limit: number;
}

interface NotificationBellState {
  hasMore: boolean;
  notifications: UserNotification[];
  anchorEl: null | HTMLElement;
  unreadNotifications: string[];
}

class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
  constructor(props: NotificationBellProps) {
    super(props);
    this.state = {
      anchorEl: null,
      hasMore: true,
      notifications: [],
      unreadNotifications: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
  }

  getNotifications(): void {
    this.props
      .getNotifications({
        limit: this.props.limit,
        skip: this.state.notifications.length,
      })
      .then((notifications) => {
        this.setState({
          hasMore: notifications.length === this.props.limit,
          notifications: notifications.length ? [...this.state.notifications, ...notifications] : notifications,
          unreadNotifications: [
            ...this.state.unreadNotifications,
            ...notifications.filter((notification) => !notification.read).map((notification) => notification._id),
          ],
        });
      });
  }

  componentDidMount(): void {
    this.getNotifications();
  }

  handleClick(event: React.MouseEvent<HTMLElement>): void {
    this.setState({ anchorEl: this.state.anchorEl ? null : event.currentTarget });
    if (this.state.unreadNotifications.length)
      this.props
        .readNotifications(this.state.unreadNotifications)
        .then(() => this.setState({ unreadNotifications: [] }));
  }

  render(): React.ReactElement {
    const { anchorEl, notifications, unreadNotifications, hasMore } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popper' : undefined;
    return (
      <>
        <IconButton onClick={this.handleClick}>
          <Badge badgeContent={unreadNotifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popper anchorEl={anchorEl} id={id} open={open} style={{ zIndex: 1300 }} transition>
          <Paper>
            <NotificationList
              getNotifications={this.getNotifications}
              hasMore={hasMore}
              notifications={notifications}
            />
          </Paper>
        </Popper>
      </>
    );
  }
}

export default NotificationBell;
