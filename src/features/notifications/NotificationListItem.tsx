import { WithTranslation, withTranslation } from 'react-i18next';

import Badge from '@material-ui/core/Badge';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { MinimumNotificationProps } from 'types/notifications';
import Moment from 'react-moment';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export type NotificationListItemProps =
  | {
      loading: true;
    }
  | (MinimumNotificationProps & {
      loading?: false;
      link?: string;
    });

const NotificationListItem = (props: NotificationListItemProps) => (
  <ListItem button component={Link} to={!props.loading && props.link ? props.link : ''}>
    <ListItemAvatar>
      {props.loading ? (
        <Skeleton height={40} variant="circle" width={40} />
      ) : props.read ? (
        <CommentIcon />
      ) : (
        <Badge badgeContent=" " color="secondary" variant="dot">
          <CommentIcon />
        </Badge>
      )}
    </ListItemAvatar>
    <ListItemText
      primary={props.loading ? <Skeleton variant="text" /> : props.type}
      secondary={props.loading ? <Skeleton variant="text" /> : <Moment fromNow>{props.at}</Moment>}
    />
  </ListItem>
);

export type TranslatedNotificationListItemProps = WithTranslation &
  MinimumNotificationProps & {
    loading?: false;
    link?: string;
  };

export const TranslatedNotificationListItem = withTranslation()((props: TranslatedNotificationListItemProps) => {
  if (props.loading) return <NotificationListItem loading />;
  return <NotificationListItem {...props} type={props.t(props.type)} />;
});

export default NotificationListItem;
