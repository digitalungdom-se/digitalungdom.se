import { ProfileCard } from './ProfileCard';
import React from 'react';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

function ProfilePage(): React.ReactElement {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({
    params: {
      dateAfter: '0',
      dateBefore: 'ffffffff',
      sort: 'NEW',
      username,
    },
    url: '/api/agora/get/user',
  });

  if (loading) return <div />;
  if (error) return <div />;

  const name = data.user.details.name.split(' ');

  return (
    <ProfileCard
      firstName={name[0]}
      joinDate={new Date(parseInt(data.user._id.substring(0, 8), 16) * 1000)}
      lastName={name.slice(1, name.length).join(' ')}
      username={data.user.details.username}
    />
  );
}

export default ProfilePage;
