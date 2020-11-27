import { editAgoragramSuccess, selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import Axios from 'axios';
import Comment from './Comment';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/users/usersSlice';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';

interface ReduxConnectedCommentProps {
  _id: string;
  level: number;
  highlightCommentID?: string;
}

export default function ReduxConnectedComment({ _id, level, highlightCommentID }: ReduxConnectedCommentProps) {
  const dispatch = useDispatch();
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  const myProfile = useSelector(selectMyProfile);
  const showAuthDialog = useAuthDialog();
  if (props === undefined) return null;
  return (
    <Comment
      author={<UserLink details={props.author?.details} />}
      body={props.body}
      handleDelete={() => {
        Axios.delete(`/agoragram/${_id}`).then((res) => {
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
        Axios.put(`/agoragram/${_id}`, {
          body,
        }).then((res) => {
          setSubmitting(false);
          dispatch(
            editAgoragramSuccess({
              _id,
              edited: {
                body,
                modified: new Date().toISOString(),
              },
            }),
          );
        });
      }}
      handleStarring={(): boolean => {
        if (myProfile === null) {
          showAuthDialog(true);
          return false;
        }
        Axios.post(`/agoragram/${_id}/star`).catch(() => {});
        dispatch(
          starAgoragramSuccess({
            action: props.starred === true ? 'UNSTARRED' : 'STARRED',
            agoragramID: _id,
          }),
        );
        return true;
      }}
      isAuthor={Boolean(props.author && props.author._id === myProfile?._id)}
      isNew={props.isNew || highlightCommentID === props._id}
      level={level}
      modified={props.modified}
      replyField={(setReplying: (b: boolean) => void) => <AgoraReplyComment replyTo={_id} setReplying={setReplying} />}
      starred={props.starred}
      stars={props.stars}
      time={mongoIdToDate(props._id)}
    >
      {props.children.map((comment) => (
        <ReduxConnectedComment
          _id={comment.agoragram}
          highlightCommentID={highlightCommentID}
          key={comment.agoragram}
          level={level + 1}
        />
      ))}
    </Comment>
  );
}
