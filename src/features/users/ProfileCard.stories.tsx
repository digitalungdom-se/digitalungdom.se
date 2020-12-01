import { ProfileCard, ProfileState } from './ProfileCard';

import React from 'react';
import StoryMetadata from 'components/StoryMetadata';

const story: StoryMetadata = {
  component: ProfileCard,
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
  title: 'ProfileCard',
};

export default story;

export const Basic = (): React.ReactElement => (
  <ProfileCard
    bio={'Studerar datateknik på KTH.\n20 år gammal.\nOrdförande för Digital Ungdom.'}
    firstName="Douglas"
    joinDate={new Date()}
    lastName="Bengtsson"
    status="Digital Ungdom!"
    url="https://digitalungdom.se"
    username="Nautman"
  />
);

export const EditableProfile = (): React.ReactElement => {
  const [state, setState] = React.useState<ProfileState>({
    bio:
      'Studerar på Handelshögskolan i Stockholm. Pausat studier i datateknik vid KTH.\n20 år gammal.\nKassör för Digital Ungdom.',
    url: 'https://digitalungdom.se',
    status: 'Digital Ungdom!',
  });

  const { bio, url, status } = state;

  return (
    <ProfileCard
      bio={bio}
      firstName="Douglas"
      isOwner
      joinDate={new Date()}
      lastName="Bengtsson"
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          setSubmitting(false);
          setState(values);
        }, 1000);
      }}
      status={status}
      url={url}
      username="Nautman"
    />
  );
};
