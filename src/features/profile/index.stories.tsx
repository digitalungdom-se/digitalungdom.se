import Profile, { ProfileState } from './index';

import React from 'react';
import StoryMetadata from 'components/StoryMetadata';

const story: StoryMetadata = {
  component: Profile,
  decorators: [
    (storyFn): JSX.Element => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 100,
        }}
      >
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'Profile',
};

export default story;

export const Basic = (): React.ReactElement => (
  <Profile
    bio={'Studerar datateknik på KTH.\n20 år gammal.\nOrdförande för Digital Ungdom.'}
    firstName="Douglas"
    joinDate={new Date()}
    lastName="Bengtsson"
    link="https://digitalungdom.se"
    status="Digital Ungdom!"
    username="Nautman"
  />
);

export const EditableProfile = (): React.ReactElement => {
  const [state, setState] = React.useState<ProfileState>({
    bio: 'Studerar datateknik på KTH.\n20 år gammal.\nOrdförande för Digital Ungdom.',
    link: 'https://digitalungdom.se',
    status: 'Digital Ungdom!',
  });

  const { bio, link, status } = state;

  return (
    <Profile
      bio={bio}
      firstName="Douglas"
      isOwner
      joinDate={new Date()}
      lastName="Bengtsson"
      link={link}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          setSubmitting(false);
          setState(values);
        }, 1000);
      }}
      status={status}
      username="Nautman"
    />
  );
};
