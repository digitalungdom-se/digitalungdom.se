import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import React from 'react';
import { UserNotification } from 'types/notifications';

export type NotificationListItemProps =
  | {
      loading: true;
    }
  | (UserNotification & {
      loading?: false;
    });

function NotificationListItem(props: NotificationListItemProps): React.ReactElement {
  if (props.loading) return <div />;
  return (
    <ListItem>
      <ListItemText>{props.type}</ListItemText>
    </ListItem>
  );
}

export default NotificationListItem;
