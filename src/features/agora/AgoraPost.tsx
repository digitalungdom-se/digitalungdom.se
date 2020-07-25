import { selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import Axios from 'axios';
import { CardPost } from './Post';
import { Container } from '@material-ui/core';
import React from 'react';
import ReduxConnectedComment from './AgoraComment';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { getAgoragramsSuccess } from './agoraSlice';
import { getUsersSuccess } from 'features/users/usersSlice';
import { mongoIdToDate } from 'utils/mongoid';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

export default function AgoraPost() {
  const { shortID } = useParams();
  const [{ loading, data, error }] = useAxios({
    params: {
      agoragramShortID: shortID,
    },
    url: '/api/agora/get/agoragram',
  });
  const dispatch = useDispatch();
  if (data) {
    console.log(data);
    dispatch(getAgoragramsSuccess(data));
    dispatch(getUsersSuccess(data.users));
  }
  if (loading)
    return (
      <Container maxWidth="md">
        <CardPost key={'agoragram0'} loading name="" time={new Date()} title="" username="" />
      </Container>
    );
  return (
    <Container maxWidth="md">
      <ReduxConnectedPost _id={data.agoragrams[0]._id} />
    </Container>
  );
}

export const ReduxConnectedPost = ({ _id }: { _id: string }): React.ReactElement => {
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
      link={`/agora/${props.hypagora}/${props.shortID}/comments`}
      time={mongoIdToDate(props._id)}
    >
      {props.children && (
        <>
          <AgoraReplyComment replyTo={props._id} />
          {props.children.map((agoragram) => (
            <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} />
          ))}
        </>
      )}
    </CardPost>
  );
};
