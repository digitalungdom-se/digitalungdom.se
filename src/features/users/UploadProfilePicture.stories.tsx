import React from 'react';
import StoryMetadata from 'components/StoryMetadata';
import UploadProfilePicture from './UploadProfilePicture';

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

export const Basic = (): React.ReactElement => <UploadProfilePicture />;
