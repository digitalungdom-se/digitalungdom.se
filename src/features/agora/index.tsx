import React, { useCallback, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import { CardPost } from './Post';
import Container from '@material-ui/core/Container';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { getAgoragramsSuccess } from './agoraSlice';
import { getUsersSuccess } from 'features/users/usersSlice';
import { mongoIdToDate } from 'utils/mongoid';
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

  const [data, setData] = useState<any>(null);

  const dispatch = useDispatch();
  const dispatchData = useCallback(
    (data: any) => {
      dispatch(getAgoragramsSuccess(data));
      dispatch(getUsersSuccess(data.users));
    },
    [dispatch],
  );

  useEffect(() => {
    Axios.get('/api/agora/get/agoragrams', {
      params: {
        dateAfter: dateAfter || '0',
        dateBefore: dateBefore || 'ffffffff',
        hypagora: hypagora === 'general' ? null : hypagora,
        sort: sort ? sort.toUpperCase() : 'NEW',
      },
    }).then((res) => {
      setData(res.data);
      dispatchData(res.data);
    });
  }, [hypagora, dateAfter, dateBefore, sort, dispatchData]);

  return (
    <Container className={classes.root} fixed maxWidth="md">
      <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      {Boolean(data) === false
        ? [0, 0, 0, 0, 0].map((_, index) => (
            <CardPost key={'agoragram' + index} loading name="" time={new Date()} title="" username="" />
          ))
        : data?.agoragrams.map(({ _id }: Agoragram) => <Post _id={_id} key={_id} />)}
    </Container>
  );
}

const Post = ({ _id }: { _id: string }): React.ReactElement => {
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  const dispatch = useDispatch();
  if (props === undefined) return <></>;
  return (
    <CardPost
      {...props}
      author={<UserLink id={props.author} />}
      handleStarring={(): void => {
        Axios.post('/api/agora/asteri', {
          agoragramID: _id,
        });
        dispatch(
          starAgoragramSuccess({
            action: props.isStarred === true ? 'UNSTARRED' : 'STARRED',
            agoragramID: _id,
          }),
        );
      }}
      time={mongoIdToDate(props._id)}
    />
  );
};
