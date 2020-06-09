import ProfileHeaderButton from './ProfileHeaderButton';
import React from 'react';
import StoryMetadata from './StoryMetadata';
import { action } from '@storybook/addon-actions';

const story: StoryMetadata = {
  component: ProfileHeaderButton,
  decorators: [(storyFn): JSX.Element => <div style={{ padding: 100, textAlign: 'center' }}>{storyFn()}</div>],
  title: 'ProfileHeaderButton',
};

export default story;

export const Basic = (): JSX.Element => {
  return <ProfileHeaderButton logout={action('logout')} name="Douglas Bengtsson" username="Nautman" />;
};
