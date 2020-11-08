import { ConnectedProps, connect } from 'react-redux';

import Axios from 'axios';
import { ProfileCard } from './ProfileCard';
import React from 'react';
import { RootState } from 'app/store';
import { User } from './userTypes';
import { getUsersSuccess } from './usersSlice';
import { selectMyId } from 'features/auth/authSlice';

interface ProfilePageState {
  loading: boolean;
  error: boolean;
  user: User | null;
}

interface ServerResponse {
  user: User;
  users: User[];
}

const mapState = (state: RootState) => ({
  myId: selectMyId(state),
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
        this.setState({ user: res.data.user });
      })
      .catch((err) => this.setState({ error: true }));
  }

  render() {
    const { user } = this.state;
    if (user == null) return <div>Loading</div>;
    return (
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
    );
  }
}

export default connector(ProfilePage);
