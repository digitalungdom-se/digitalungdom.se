import Post from './Post';
import React from 'react';

const story = {
  component: Post,
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
  title: 'Post',
};

export default story;

export const OnlyTitle = (): JSX.Element => {
  return <Post name="Douglas Bengtsson" time={new Date()} title="Hello, world!" username="Nautman" />;
};

export const ShortBody = (): JSX.Element => {
  return (
    <Post
      body="It's a pleasure to meet you."
      name="Douglas Bengtsson"
      time={new Date()}
      title="Hello, world!"
      username="Nautman"
    />
  );
};
