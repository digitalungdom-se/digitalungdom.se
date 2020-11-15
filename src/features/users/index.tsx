import { ConnectedProps, connect } from 'react-redux';
import { getUsersSuccess, selectMyProfile } from './usersSlice';

import { AgoraInfiniteScroll } from 'features/agora';
import { Agoragram } from 'features/agora/agoraTypes';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { ProfileCard } from './ProfileCard';
import React from 'react';
import { RootState } from 'app/store';
import { User } from './userTypes';

interface ProfilePageState {
  loading: boolean;
  error: boolean;
  user: User | null;
  agoragrams: Agoragram[];
}

type ServerResponse = User;

const mapState = (state: RootState) => ({
  myProfile: selectMyProfile(state),
});

const mapDispatch = {
  getUsersSuccess,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ProfilePageProps = PropsFromRedux & {
  username: string;
};

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {
      agoragrams: [],
      error: false,
      loading: false,
      user: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get<ServerResponse>('/user', {
      params: {
        dateAfter: '0',
        dateBefore: 'ffffffff',
        sort: 'NEW',
        username: this.props.username,
      },
    })
      .then((res) => {
        this.props.getUsersSuccess([res.data]);
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => this.setState({ error: true }));
  }

  render() {
    const { user } = this.state;
    if (user == null) return <div>Loading</div>;
    return (
      <Grid container justify="center">
        <Grid item md={3} sm={8} xs={12}>
          <ProfileCard
            bio={user.agora.profile?.bio}
            firstName={user.details.firstName}
            isOwner={this.props.myProfile?._id === user._id}
            joinDate={new Date(parseInt(user._id.substring(0, 8), 16) * 1000)}
            lastName={user.details.lastName}
            onSubmit={(values, { setSubmitting }): void => {
              // const array: Array<[string, Record<string, unknown>]> = [];
              // for (const [key, value] of Object.entries(values)) {
              //   array.push(['profile.' + key, { [key]: value }]);
              // }
              Axios.put('/user/@me', {
                profileBio: values.bio,
                profileStatus: values.status,
                profileUrl: values.url,
              }).then((res) => {
                setSubmitting(false);
                this.setState({
                  user: {
                    ...user,
                    agora: {
                      profile: {
                        ...user.agora.profile,
                        ...values,
                      },
                    },
                  },
                });
              });
            }}
            status={user.agora.profile?.status}
            url={user.agora.profile?.url}
            username={user.details.username}
          />
        </Grid>
        <Grid item md={6} sm={8} xs={11}>
          <AgoraInfiniteScroll authorID={user._id} />
        </Grid>
      </Grid>
    );
  }
}

export default connector(ProfilePage);
