import React, { useState } from 'react';
import { Theme, createStyles, lighten, makeStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import { TranslatedNotificationListItem as NotificationListItem } from './NotificationListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserNotification } from 'types/notifications';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    list: {
      '& > span': {
        marginLeft: theme.spacing(3),
      },
      flex: '1',
      overflow: 'auto',
    },
    root: {
      display: 'flex',
      flex: 'none',
      height: theme.spacing(8),
      paddingRight: theme.spacing(0.5),
      width: '100%',
      zIndex: 1,
    },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface NotificationListProps {
  getNotifications: () => Promise<void>;
  notifications: UserNotification[];
  hasMore: boolean;
  className?: string;
  deleteNotifications: (notifications: string[]) => Promise<void>;
}

const NotificationList = ({
  notifications,
  hasMore,
  getNotifications,
  ...props
}: NotificationListProps): React.ReactElement => {
  const classes = useStyles();

  const [selected, setSelected] = useState<string[]>([]);
  const handleSelect = (id: string) => {
    if (selected.indexOf(id) === -1) return setSelected([...selected, id]);
    const array = [...selected];
    array.splice(selected.indexOf(id), 1);
    return setSelected(array);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(notifications.map((notification) => notification._id));
      return;
    }
    setSelected([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', margin: 0 }}>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: selected.length > 0,
        })}
      >
        {selected.length > 0 ? (
          <Typography className={classes.title} color="inherit" component="div" variant="subtitle1">
            {selected.length} {'valda' /* Translation needed */}
          </Typography>
        ) : (
          <Typography className={classes.title} component="div" id="tableTitle" variant="h6">
            {'Notifikationer' /* Translation needed */}
          </Typography>
        )}
        {selected.length > 0 && (
          <IconButton
            aria-label="delete"
            onClick={() => props.deleteNotifications(selected).then(() => setSelected([]))}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {notifications.length > 0 && (
          <Checkbox
            checked={notifications.length > 0 && selected.length === notifications.length}
            indeterminate={selected.length > 0 && selected.length < notifications.length}
            inputProps={{ 'aria-label': 'select all desserts' }}
            onChange={handleSelectAllClick}
          />
        )}
      </Toolbar>
      <List className={classes.list}>
        {notifications.length === 0 && hasMore === false && (
          <span>{'Inga fler notifikationer.' /* Translation needed */}</span>
        )}
        <InfiniteScroll
          className={props.className}
          hasMore={hasMore}
          loader={<NotificationListItem loading />}
          loadMore={getNotifications}
          pageStart={0}
          useWindow={false}
        >
          {notifications.map((notification, index) => (
            <NotificationListItem
              key={index}
              {...notification}
              checked={selected.indexOf(notification._id) !== -1}
              loading={false}
              onCheckboxChange={() => handleSelect(notification._id)}
            />
          ))}
        </InfiniteScroll>
      </List>
    </div>
  );
};

export default NotificationList;
