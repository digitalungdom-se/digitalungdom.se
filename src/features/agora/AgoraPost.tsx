import { ConnectedProps, connect } from 'react-redux';
import { editAgoragramSuccess, getAgoragramsSuccess } from './agoraSlice';
import { selectAgoragramById, starAgoragramSuccess } from './agoraSlice';
import { useDispatch, useSelector } from 'react-redux';

import AgoraReplyComment from './AgoraReplyComment';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import Loading from 'components/Loading';
import Post from './Post';
import React from 'react';
import ReduxConnectedComment from './AgoraComment';
import { RootState } from 'app/store';
import { RouteComponentProps } from 'react-router-dom';
import UserLink from 'features/users/UserLink';
import { mongoIdToDate } from 'utils/mongoid';
import { selectMyProfile } from 'features/users/usersSlice';
import { useAuthDialog } from 'features/auth/AuthDialogProvider';

interface AgoraPostMatchParams {
  shortID?: string;
  commentID?: string;
}

interface AgoragramTree {
  [key: string]: Agoragram;
}

type AgoraPostProps = RouteComponentProps<AgoraPostMatchParams> & PropsFromRedux;

interface AgoraPostState {
  root: string | null;
}

const mapDispatch = {
  getAgoragramsSuccess,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class AgoraPost extends React.Component<AgoraPostProps, AgoraPostState> {
  constructor(props: AgoraPostProps) {
    super(props);
    this.state = {
      root: null,
    };
  }

  getAgoragram() {
    Axios.get<Agoragram[]>(`/agoragram/${this.props.match.params.shortID}`).then((res) => {
      const commentID = this.props.match.params.commentID;
      const agoragrams = res.data;
      if (commentID) {
        const tree: AgoragramTree = {};
        agoragrams.forEach((agoragram) => (tree[agoragram._id] = agoragram));
        let root = commentID;
        while (tree[root].replyTo !== agoragrams[0]._id) {
          root = tree[root].replyTo;
        }
        agoragrams[0].children = agoragrams[0].children.filter((child) => child.agoragram !== root);
        agoragrams[0].children.unshift({ agoragram: root, stars: tree[root].stars });
      }
      if (res.data.length === 0) return this.setState({ root: 'deleted' });
      this.props.getAgoragramsSuccess(res.data);
      this.setState({ root: agoragrams[0]._id });
    });
  }

  componentDidMount() {
    this.getAgoragram();
  }
  render() {
    if (this.state.root === null) {
      return (
        <Container maxWidth="md">
          <Post loading />
        </Container>
      );
    }
    if (this.state.root === 'deleted') return <div>deleted</div>;
    return (
      <Container maxWidth="md">
        <ReduxConnectedPost
          _id={this.state.root}
          displayComments
          highlightCommentID={this.props.match.params.commentID}
        />
      </Container>
    );
  }
}

export default connector(AgoraPost);

interface ReduxConnectedPostProps {
  _id: string;
  displayComments?: boolean;
  longPostIsFadedOut?: boolean;
  highlightCommentID?: string;
}

export const ReduxConnectedPost = ({
  _id,
  displayComments = false,
  longPostIsFadedOut,
  highlightCommentID,
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
      link={`/agora/${props.hypagora}/${props.shortID}`}
      longPostIsFadedOut={longPostIsFadedOut}
      time={mongoIdToDate(props._id)}
    >
      {displayComments &&
        (props.children ? (
          <>
            <AgoraReplyComment replyTo={props._id} />
            {props.children.map((comment) => (
              <ReduxConnectedComment
                _id={comment.agoragram}
                highlightCommentID={highlightCommentID}
                key={comment.agoragram}
                level={0}
              />
            ))}
          </>
        ) : (
          <Loading minHeight={100} />
        ))}
    </Post>
  );
};
