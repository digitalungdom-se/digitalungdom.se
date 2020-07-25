import AgoraReplyComment from './AgoraReplyComment';
import Comment from './Comment';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectAgoragramById } from './agoraSlice';
import { useSelector } from 'react-redux';

export default function ReduxConnectedComment({ _id }: { _id: string }) {
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  if (props === undefined) return null;
  return (
    <Comment
      author={<UserLink id={props.author} />}
      replyField={<AgoraReplyComment replyTo={_id} />}
      text={props.body}
      time={mongoIdToDate(props._id)}
    >
      {props.children.map((agoragram) => (
        <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} />
      ))}
    </Comment>
  );
}
