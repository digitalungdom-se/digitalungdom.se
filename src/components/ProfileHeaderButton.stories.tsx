import ProfileHeaderButton from './ProfileHeaderButton';
import React from 'react';
import { action } from '@storybook/addon-actions';

const story = {
  component: ProfileHeaderButton,
  title: 'ProfileHeaderButton',
};

export default story;

export const Basic = (): JSX.Element => {
  return <ProfileHeaderButton firstName="Douglas" lastName="Bengtsson" logout={action('logout')} username="Nautman" />;
};
