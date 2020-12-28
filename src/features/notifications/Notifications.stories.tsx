import NotificationListItem, { TranslatedNotificationListItem } from './NotificationListItem';
import React, { useState } from 'react';

import NotificationBell from './NotificationBell';
import NotificationList from './NotificationList';
import { UserNotification } from 'types/notifications';
import { action } from '@storybook/addon-actions';

const story = {
  component: NotificationBell,
  title: 'Notifications',
};

export default story;

let notificationID = 0;

function generateNotifications(n: number): UserNotification[] {
  const notifications: UserNotification[] = [];
  for (let i = 0; i < n; i++) {
    notificationID++;
    notifications.push({
      at: new Date(),
      type: 'COMMENT_ON_COMMENT',
      data: {
        post: '',
        comment: '',
      },
      _id: notificationID.toString(),
    });
  }
  return notifications;
}

const notifications: UserNotification[] = generateNotifications(10);

export const Basic = (): JSX.Element => {
  return (
    <NotificationBell
      deleteNotifications={(): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 1000);
        })
      }
      getNotifications={(): Promise<UserNotification[]> =>
        new Promise((resolve) => {
          setTimeout(() => resolve(notifications), 1000);
        })
      }
      limit={10}
      readNotifications={(): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 1000);
        })
      }
    />
  );
};

export const LoadingNotification = () => (
  <div style={{ width: 200 }}>
    <NotificationListItem loading />
  </div>
);

export const CommentNotification = () => (
  <div style={{ width: 200 }}>
    <NotificationListItem at={new Date()} type="COMMENT_ON_COMMENT" />
  </div>
);

export const TranslatedCommentNotification = () => (
  <div style={{ width: 400 }}>
    <TranslatedNotificationListItem at={new Date()} type="COMMENT_ON_COMMENT" />
  </div>
);

export const List = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>(generateNotifications(10));
  const [hasMore, setHasMore] = useState<boolean>(true);
  return (
    <div style={{ width: 400, height: 400, overflow: 'auto' }}>
      <NotificationList
        deleteNotifications={(deletedNotifications) =>
          new Promise((resolve) => {
            setTimeout(() => {
              action('delete')(deletedNotifications);
              setNotifications(
                notifications.filter((notification) => deletedNotifications.indexOf(notification._id) === -1),
              );
              setHasMore(false);
              resolve();
            }, 1000);
          })
        }
        getNotifications={() =>
          new Promise((resolve) => {
            if (notifications.length < 100) {
              if (hasMore)
                setTimeout(() => {
                  setNotifications([...notifications, ...generateNotifications(10)]);
                  setHasMore(notifications.length < 100);
                  resolve();
                }, 1000);
              resolve();
            }
          })
        }
        hasMore={hasMore}
        notifications={notifications}
      />
    </div>
  );
};

// export const Basic = (): JSX.Element => {
//   return (
//     <Route path="/:sort?">
//       {({ match }): React.ReactElement => <AgoraFilter hypagora="general" path="/" sort={match?.params.sort} />}
//     </Route>
//   );
// };
