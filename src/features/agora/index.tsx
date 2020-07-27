import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import InfiniteScroll from 'react-infinite-scroller';
import Paper from '@material-ui/core/Paper';
import Post from './Post';
import { ReduxConnectedPost } from './AgoraPost';
import { Link as RouterLink } from 'react-router-dom';
import { getAgoragramsSuccess } from './agoraSlice';
import { getUsersSuccess } from 'features/users/usersSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: theme.spacing(2),
    },
    widget: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(9),
      marginLeft: theme.spacing(2),
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
      <Box flexGrow={1}>
        <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
        {loading ? (
          <Post loading />
        ) : (
          <InfiniteScroll
            hasMore={data.hasMore}
            loader={<Post key={'agoragram6'} loading time={new Date()} title="" />}
            loadMore={(): void => fetchData(false)}
            pageStart={0}
            threshold={300}
          >
            {data?.agoragrams.map(({ _id }: Agoragram) => (
              <ReduxConnectedPost _id={_id} key={_id} />
            ))}
          </InfiniteScroll>
        )}
      </Box>
      <Box maxWidth={300} minWidth={300} width={300}>
        <Paper className={classes.widget}>
          <Typography component="h6" variant="h6">
            Agora
          </Typography>
          <Typography>
            <b>Agora</b> är Digital Ungdoms egna forum där medlemmar kan göra inlägg.
          </Typography>
          <Typography variant="subtitle2">
            Agora är benämningen av torg i antika grekiska städer. De användes som marknadsplats eller allmän
            mötesplats.
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            disableElevation
            fullWidth
            to={`/agora/submit`}
            variant="contained"
          >
            Publish
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
