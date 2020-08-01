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
import { getUsersSuccess } from 'features/users/usersSlice';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/auth/authSlice';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function AgoraPost() {
  const { shortID } = useParams();
  const [{ loading, data }] = useAxios({
    params: {
      agoragramShortID: shortID,
    },
    url: '/api/agora/get/agoragram',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getAgoragramsSuccess(data));
      dispatch(getUsersSuccess(data.users));
    }
  }, [data, dispatch]);
  if (loading)
    return (
      <Container maxWidth="md">
        <Post loading />
      </Container>
    );
  if (data.agoragrams.length === 0) return <div>deleted</div>;
  return (
    <Container maxWidth="md">
      <ReduxConnectedPost _id={data.agoragrams[0]._id} displayComments />
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
  const { enqueueSnackbar } = useSnackbar();
  if (props === undefined) return <></>;
  return (
    <Post
      {...props}
      author={<UserLink id={props.author} />}
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
              edited: { body },
            }),
          );
        });
      }}
      handleReport={() => {
        if (myProfile === null) {
          showAuthDialog(true);
          return false;
        }
        const reason = prompt('Why do you want to report this post?');
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
      link={`/agora/${props.hypagora}/${props.shortID}/comments`}
      longPostIsFadedOut={longPostIsFadedOut}
      time={mongoIdToDate(props._id)}
    >
      {displayComments &&
        (props.children ? (
          <>
            <AgoraReplyComment replyTo={props._id} />
            {props.children.map((agoragram) => (
              <ReduxConnectedComment _id={agoragram._id} key={agoragram._id} level={0} />
            ))}
          </>
        ) : (
          <Loading minHeight={100} />
        ))}
    </Post>
  );
};
