import React, { useEffect } from 'react';
import { editAgoragramSuccess, getAgoragramsSuccess } from './agoraSlice';
import { selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import Loading from 'components/Loading';
import Post from './Post';
import ReduxConnectedComment from './AgoraComment';
import { RootState } from 'app/store';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/users/usersSlice';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

interface AgoraPostParams {
  shortID?: string;
}

export default function AgoraPost() {
  const { shortID } = useParams<AgoraPostParams>();
  const [{ loading, data }] = useAxios({
    url: `/agoragram/${shortID}`,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getAgoragramsSuccess(data));
      // dispatch(getUsersSuccess(data.users));
    }
  }, [data, dispatch]);
  if (loading)
    return (
      <Container maxWidth="md">
        <Post loading />
      </Container>
    );
  if (data.length === 0) return <div>deleted</div>;
  return (
    <Container maxWidth="md">
      <ReduxConnectedPost _id={data[0]._id} displayComments />
    </Container>
  );
}

interface ReduxConnectedPostProps {
  _id: string;
  displayComments?: boolean;
  longPostIsFadedOut?: boolean;
}

export const ReduxConnectedPost = ({
  _id,
  displayComments = false,
  longPostIsFadedOut,
}: ReduxConnectedPostProps): React.ReactElement => {
  const props = useSelector((state: RootState) => selectAgoragramById(state, _id));
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useDispatch();
  const showAuthDialog = useAuthDialog();
  if (props === undefined) return <></>;
  return (
    <Post
      {...props}
      author={<UserLink details={props.author?.details} />}
      avatarSrc={`${Axios.defaults.baseURL}/user/${props.author?._id}/profile_picture?size=40`}
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
              edited: { body, modified: new Date().toISOString() },
            }),
          );
        });
      }}
      handleStarring={(): boolean => {
        if (myProfile === null) {
          showAuthDialog(true);
          return false;
        }
        Axios.post(`/agoragram/${_id}/star`);
        dispatch(
          starAgoragramSuccess({
            action: props.starred === true ? 'UNSTARRED' : 'STARRED',
            agoragramID: _id,
          }),
        );
        return true;
      }}
      isAuthor={Boolean(props.author && props.author._id === myProfile?._id)}
      link={`/agora/${props.hypagora}/${props.shortID}/comments`}
      longPostIsFadedOut={longPostIsFadedOut}
      time={mongoIdToDate(props._id)}
    >
      {displayComments &&
        (props.children ? (
          <>
            <AgoraReplyComment replyTo={props._id} />
            {props.children.map((comment) => (
              <ReduxConnectedComment _id={comment.agoragram} key={comment.agoragram} level={0} />
            ))}
          </>
        ) : (
          <Loading minHeight={100} />
        ))}
    </Post>
  );
};
