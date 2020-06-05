import ProfileHeaderButton from './ProfileHeaderButton';
import React from 'react';

export default {
  component: ProfileHeaderButton,
  decorators: [(storyFn): JSX.Element => <div style={{ padding: 100, textAlign: 'center' }}>{storyFn()}</div>],
  title: 'ProfileHeaderButton',
};

export const Basic = (): JSX.Element => <ProfileHeaderButton />;
