import { selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import Comment from './Comment';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';

export default function ReduxConnectedComment({ _id }: { _id: string }) {
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  return (
    <Comment author={<UserLink id={props.author} />} text={props.body} time={mongoIdToDate(props._id)}>
      {props.children.map((agoragram) => (
        <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} />
      ))}
    </Comment>
  );
}
