import React from 'react';
import UploadProfilePicture from './UploadProfilePicture';
import { action } from '@storybook/addon-actions';

const story = {
  component: UploadProfilePicture,
  title: 'UploadProfilePicture',
};

export default story;

export const Basic = (): React.ReactElement => (
  <UploadProfilePicture
    onSubmit={(url): Promise<void> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          action('Submitted')(url);
          resolve();
        }, 1000);
      })
    }
  />
);
