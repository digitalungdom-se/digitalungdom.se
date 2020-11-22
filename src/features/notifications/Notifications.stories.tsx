import NotificationListItem, { TranslatedNotificationListItem } from './NotificationListItem';
import React, { useRef, useState } from 'react';

import { Meta } from '@storybook/react/types-6-0';
import NotificationBell from './NotificationBell';
import NotificationList from './NotificationList';
// import { Route } from 'react-router-dom';
// import StoryMetadata from 'components/StoryMetadata';
import { UserNotification } from 'types/notifications';

const story: Meta = {
  component: NotificationBell,
  decorators: [
    (storyFn): JSX.Element => (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '80vh',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'Notifications',
};

export default story;

function generateNotifications(n: number): UserNotification[] {
  const notifications: UserNotification[] = [];
  for (let i = 0; i < n; i++) {
    notifications.push({
      at: new Date(),
      type: 'COMMENT_ON_COMMENT',
      data: {
        post: '',
        comment: '',
      },
      _id: '',
    });
  }
  return notifications;
}

const notifications: UserNotification[] = generateNotifications(10);

export const Basic = (): JSX.Element => {
  return (
    <NotificationBell
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
  <div style={{ width: 220 }}>
    <TranslatedNotificationListItem at={new Date()} type="COMMENT_ON_COMMENT" />
  </div>
);

export const List = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>(generateNotifications(10));
  const scrollParentRef = useRef<HTMLElement>(null);
  return (
    <div
      ref={scrollParentRef as React.RefObject<HTMLDivElement>}
      style={{ width: 400, maxHeight: 400, overflow: 'auto' }}
    >
      <NotificationList
        getNotifications={() =>
          new Promise((resolve) => {
            if (notifications.length < 100) {
              setTimeout(() => {
                setNotifications([...notifications, ...generateNotifications(10)]);
                resolve();
              }, 1000);
            }
          })
        }
        hasMore={notifications.length < 100}
        notifications={notifications}
        scrollParentRef={scrollParentRef}
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
