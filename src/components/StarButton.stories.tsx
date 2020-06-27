import React from 'react';
import StarButton from './StarButton';

export default {
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

export const Basic = (): JSX.Element => <StarButton />;
