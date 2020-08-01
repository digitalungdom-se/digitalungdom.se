import React, { useCallback, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import InfiniteScroll from 'react-infinite-scroller';
import Post from './Post';
import PublishAgoragramWidget from './PublishAgoragramWidget';
import { ReduxConnectedPost } from './AgoraPost';
import { getAgoragramsSuccess } from './agoraSlice';
import { getUsersSuccess } from 'features/users/usersSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    widget: {
      marginLeft: theme.spacing(2),
      float: 'left',
    },
  }),
);

export default function Agora(): React.ReactElement {
  const classes = useStyles();
  const { hypagora, sort, dateAfter, dateBefore } = useParams();

  const [data, setData] = useState<any>({
    agoragrams: [],
    hasMore: true,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const dispatchData = useCallback(
    (data: any) => {
      dispatch(getAgoragramsSuccess(data));
      dispatch(getUsersSuccess(data.users));
    },
    [dispatch],
  );

  const fetchData = (changeLoading = true): void => {
    if (changeLoading) setLoading(true);
    Axios.get('/api/agora/get/agoragrams', {
      params: {
        dateAfter: dateAfter || '0',
        dateBefore: Boolean(sort?.toUpperCase() !== 'TOP' && data.agoragrams.length && changeLoading === false)
          ? (parseInt(data.agoragrams[data.agoragrams.length - 1]._id.substring(0, 8), 16) - 1).toString(16)
          : dateBefore || 'ffffffff',
        hypagora: hypagora === 'general' ? null : hypagora,
        sort: sort ? sort.toUpperCase() : 'NEW',
        topIndex: changeLoading === false ? data.agoragrams.length : 0,
      },
    }).then((res) => {
      setData({
        ...data,
        agoragrams: changeLoading === false ? [...data.agoragrams, ...res.data.agoragrams] : res.data.agoragrams,
        hasMore: Boolean(res.data.agoragrams.length),
      });
      dispatchData(res.data);
      if (changeLoading) setLoading(false);
    });
  };

  useEffect(fetchData, [dateAfter, dateBefore, hypagora, sort]);

  return (
    <Container className={classes.root} fixed maxWidth="md">
      <div style={{ padding: '0 2px' }}>
        <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      </div>
      <div style={{ display: 'flex' }}>
        <Box flexGrow={1} style={{ overflow: 'auto', padding: '0 2px 2px 2px' }}>
          <Hidden mdUp>
            <PublishAgoragramWidget />
          </Hidden>
          {loading ? (
            <Post loading />
          ) : (
            <InfiniteScroll
              hasMore={data.hasMore}
              loader={<Post loading />}
              loadMore={(): void => fetchData(false)}
              pageStart={0}
              threshold={300}
            >
              {data?.agoragrams.map(({ _id }: Agoragram) => (
                <ReduxConnectedPost _id={_id} key={_id} longPostIsFadedOut />
              ))}
            </InfiniteScroll>
          )}
        </Box>
        <Hidden smDown>
          <Box className={classes.widget} maxWidth={300} minWidth={300} width={300}>
            <PublishAgoragramWidget />
          </Box>
        </Hidden>
      </div>
    </Container>
  );
}
