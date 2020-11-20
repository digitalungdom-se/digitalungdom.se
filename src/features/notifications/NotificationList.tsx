import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import NotificationListItem from './NotificationListItem';
import React from 'react';
import { UserNotification } from 'types/notifications';

interface NotificationListProps {
  getNotifications: () => void;
  notifications: UserNotification[];
  hasMore: boolean;
}

class NotificationList extends React.Component<NotificationListProps> {
  render(): React.ReactElement {
    const { notifications, hasMore } = this.props;
    return (
      <InfiniteScroll
        hasMore={hasMore}
        loader={<NotificationListItem loading />}
        loadMore={this.props.getNotifications}
      >
        <List>
          {notifications.map((notification, index) => (
            <NotificationListItem key={index} {...notification} />
          ))}
        </List>
      </InfiniteScroll>
    );
  }
}

export default NotificationList;
