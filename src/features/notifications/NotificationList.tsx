import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import NotificationListItem from './NotificationListItem';
import React from 'react';
import { UserNotification } from 'types/notifications';

interface NotificationListProps {
  getNotifications: () => Promise<void>;
  notifications: UserNotification[];
  hasMore: boolean;
  className?: string;
  scrollParentRef: React.RefObject<HTMLElement>;
}

const NotificationList = ({
  notifications,
  hasMore,
  getNotifications,
  scrollParentRef,
  ...props
}: NotificationListProps): React.ReactElement => {
  return (
    <List>
      <InfiniteScroll
        className={props.className}
        getScrollParent={() => scrollParentRef.current}
        hasMore={hasMore}
        loader={<NotificationListItem loading />}
        loadMore={getNotifications}
        pageStart={0}
        useWindow={false}
      >
        {notifications.map((notification, index) => (
          <NotificationListItem key={index} {...notification} />
        ))}
      </InfiniteScroll>
    </List>
  );
};

export default NotificationList;
