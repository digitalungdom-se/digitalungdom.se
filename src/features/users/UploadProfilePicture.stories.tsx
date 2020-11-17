import React from 'react';
import StoryMetadata from 'components/StoryMetadata';
import UploadProfilePicture from './UploadProfilePicture';
import { action } from '@storybook/addon-actions';

const story: StoryMetadata = {
  component: UploadProfilePicture,
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
