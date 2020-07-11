import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import { CardPost } from './Post';
import Container from '@material-ui/core/Container';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { getAgoragramsSuccess } from './agoraSlice';
import { getUsersSuccess } from 'features/users/usersSlice';
import { mongoIdToDate } from 'utils/mongoid';
import { selectAgoragramById } from './agoraSlice';
import useAxios from 'axios-hooks';
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
  const dispatch = useDispatch();

  const [{ data, loading }] = useAxios({
    method: 'GET',
    params: {
      dateAfter: dateAfter || '0',
      dateBefore: dateBefore || 'ffffffff',
      hypagora: hypagora === 'general' ? null : hypagora,
      sort: sort ? sort.toUpperCase() : 'NEW',
    },
    url: '/api/agora/get/agoragrams',
  });

  if (data) {
    dispatch(getAgoragramsSuccess(data.agoragrams));
    dispatch(getUsersSuccess(data.users));
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      {loading
        ? [0, 0, 0, 0, 0].map((_, index) => (
            <CardPost key={'agoragram' + index} loading name="" time={new Date()} title="" username="" />
          ))
        : data?.agoragrams.map(({ _id }: Agoragram) => <Post _id={_id} key={_id} />)}
    </Container>
  );
}

const Post = ({ _id }: { _id: string }): React.ReactElement => {
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  return <CardPost {...props} author={<UserLink id={props.author} />} time={mongoIdToDate(props._id)} />;
};
