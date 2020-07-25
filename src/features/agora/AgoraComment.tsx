import { editAgoragramSuccess, selectAgoragramById } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import Axios from 'axios';
import Comment from './Comment';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/auth/authSlice';

export default function ReduxConnectedComment({ _id }: { _id: string }) {
  const dispatch = useDispatch();
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  const myProfile = useSelector(selectMyProfile);
  if (props === undefined) return null;
  return (
    <Comment
      author={<UserLink id={props.author} />}
      body={props.body}
      handleDelete={() => {
        Axios.delete('/api/agora/anti_agorize', {
          data: {
            agoragramID: _id,
          },
        }).then((res) => {
          dispatch(
            editAgoragramSuccess({
              _id,
              edited: {
                author: null,
                body: null,
                deleted: true,
              },
            }),
          );
        });
      }}
      handleEdit={({ body }, { setSubmitting }) => {
        Axios.put('/api/agora/meta_agorize', {
          agoragramID: _id,
          body,
        }).then((res) => {
          setSubmitting(false);
          dispatch(
            editAgoragramSuccess({
              _id,
              edited: {
                body,
              },
            }),
          );
        });
      }}
      isAuthor={props.author === myProfile._id}
      replyField={<AgoraReplyComment replyTo={_id} />}
      time={mongoIdToDate(props._id)}
    >
      {props.children.map((agoragram) => (
        <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} />
      ))}
    </Comment>
  );
}
