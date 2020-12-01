import React from 'react';
import StarButton from './StarButton';
import StoryMetadata from './StoryMetadata';

const metadata: StoryMetadata = {
  component: StarButton,
  decorators: [
    (storyFn): JSX.Element => (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'StarButton',
};

export default metadata;

export const Basic = (): JSX.Element => <StarButton />;
