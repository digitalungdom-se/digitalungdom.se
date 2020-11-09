import { ConnectedProps, connect } from 'react-redux';

import { Agoragram } from 'features/agora/agoraTypes';
import Axios from 'axios';
import { Grid } from '@material-ui/core';
import { ProfileCard } from './ProfileCard';
import React from 'react';
import { ReduxConnectedPost } from 'features/agora/AgoraPost';
import { RootState } from 'app/store';
import { User } from './userTypes';
import { getAgoragramsSuccess } from 'features/agora/agoraSlice';
import { getUsersSuccess } from './usersSlice';
import { selectMyId } from 'features/auth/authSlice';

interface ProfilePageState {
  loading: boolean;
  error: boolean;
  user: User | null;
  agoragrams: Agoragram[];
}

interface ServerResponse {
  user: User;
  users: User[];
  agoragrams: Agoragram[];
}

const mapState = (state: RootState) => ({
  myId: selectMyId(state),
});

const mapDispatch = {
  getUsersSuccess,
  getAgoragramsSuccess,
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
    Axios.get<ServerResponse>('/api/agora/get/user', {
      params: {
        dateAfter: '0',
        dateBefore: 'ffffffff',
        sort: 'NEW',
        username: this.props.username,
      },
    })
      .then((res) => {
        this.props.getUsersSuccess(res.data.users);
        this.props.getAgoragramsSuccess(res.data);
        this.setState({
          agoragrams: res.data.agoragrams,
          user: res.data.user,
        });
      })
      .catch((err) => this.setState({ error: true }));
  }

  render() {
    const { user, agoragrams } = this.state;
    if (user == null) return <div>Loading</div>;
    return (
      <Grid container justify="center">
        <Grid item md={3} sm={8} xs={12}>
          <ProfileCard
            bio={user.profile.bio}
            firstName={user.details.name.split(' ')[0]}
            isOwner={this.props.myId === user._id}
            joinDate={new Date(parseInt(user._id.substring(0, 8), 16) * 1000)}
            lastName={user.details.name.split(' ')[1]}
            onSubmit={(values, { setSubmitting }): void => {
              const array: Array<[string, Record<string, unknown>]> = [];
              for (const [key, value] of Object.entries(values)) {
                array.push(['profile.' + key, { [key]: value }]);
              }
              Axios.put('/api/user/set', {
                updates: array,
              }).then((res) => {
                setSubmitting(false);
                this.setState({
                  user: {
                    ...user,
                    profile: {
                      ...user.profile,
                      ...values,
                    },
                  },
                });
              });
            }}
            status={user.profile.status}
            url={user.profile.url}
            username={user.details.username}
          />
        </Grid>
        <Grid item md={6}>
          {agoragrams.map(({ _id }: Agoragram) => (
            <ReduxConnectedPost _id={_id} key={_id} longPostIsFadedOut />
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default connector(ProfilePage);
