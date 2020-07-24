import React, { useCallback, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import { CardPost } from './Post';
import Container from '@material-ui/core/Container';
import InfiniteScroll from 'react-infinite-scroller';
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

  const fetchData = (changeLoading: boolean): void => {
    if (changeLoading) setLoading(true);
    Axios.get('/api/agora/get/agoragrams', {
      params: {
        dateAfter: dateAfter || '0',
        dateBefore: dateBefore || 'ffffffff',
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

  useEffect(() => fetchData(true), [dateAfter, dateBefore, hypagora, sort]);

  return (
    <Container className={classes.root} fixed maxWidth="md">
      <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      {loading ? (
        <CardPost key={'agoragram0'} loading name="" time={new Date()} title="" username="" />
      ) : (
        <InfiniteScroll
          hasMore={data.hasMore}
          loader={<CardPost key={'agoragram6'} loading name="" time={new Date()} title="" username="" />}
          loadMore={(): void => fetchData(false)}
          pageStart={0}
        >
          {data?.agoragrams.map(({ _id }: Agoragram) => (
            <ReduxConnectedPost _id={_id} key={_id} />
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
}
