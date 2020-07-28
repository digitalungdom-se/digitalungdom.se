import { editAgoragramSuccess, selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import Axios from 'axios';
import Comment from './Comment';
import React from 'react';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/auth/authSlice';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';
import { useSnackbar } from 'notistack';

export default function ReduxConnectedComment({ _id, level }: { _id: string; level: number }) {
  const dispatch = useDispatch();
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  const myProfile = useSelector(selectMyProfile);
  const showAuthDialog = useAuthDialog();
  const { enqueueSnackbar } = useSnackbar();
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
      handleReport={() => {
        if (myProfile === null) {
          showAuthDialog(true);
          return false;
        }
        const reason = prompt('Why do you want to report this comment?');
        if (reason) {
          Axios.post('/api/agora/report', {
            id: _id,
            reason,
            reportType: 'AGORAGRAM',
          }).then((res) => {
            enqueueSnackbar('You have successfully reported!', { variant: 'success' });
          });
        }
      }}
      handleStarring={(): boolean => {
        if (myProfile === null) {
          showAuthDialog(true);
          return false;
        }
        Axios.post('/api/agora/asteri', {
          agoragramID: _id,
        });
        dispatch(
          starAgoragramSuccess({
            action: props.isStarred === true ? 'UNSTARRED' : 'STARRED',
            agoragramID: _id,
          }),
        );
        return true;
      }}
      isAuthor={Boolean(props.author && props.author === myProfile?._id)}
      isStarred={props.isStarred}
      level={level}
      replyField={(setReplying: (b: boolean) => void) => <AgoraReplyComment replyTo={_id} setReplying={setReplying} />}
      stars={props.stars}
      time={mongoIdToDate(props._id)}
    >
      {props.children.map((agoragram) => (
        <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} level={level + 1} />
      ))}
    </Comment>
  );
}
