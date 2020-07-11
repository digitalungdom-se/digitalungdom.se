import Post, { CardPost } from './Post';

import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';
import StoryMetadata from 'components/StoryMetadata';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const story: StoryMetadata = {
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

export const LinkPost = (): JSX.Element => {
  return (
    <Post
      body={'https://digitalungdom.se'}
      name="Douglas Bengtsson"
      time={new Date()}
      title="Hello, world!"
      type="LINK"
      username="Nautman"
    />
  );
};

export const Card = (): JSX.Element => {
  return (
    <div style={{ width: 400 }}>
      <CardPost
        body="https://digitalungdom.se"
        name="Douglas Bengtsson"
        time={new Date()}
        title="Hello, world!"
        type="LINK"
        username={'Nautman'}
      />
    </div>
  );
};

export const CardWithText = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '0 auto',
        width: '40%',
      }}
    >
      <CardPost
        body={lorem.generateSentences(5)}
        name="Douglas Bengtsson"
        time={new Date()}
        title="Hello, world!"
        username={'Nautman'}
      />
    </div>
  );
};

export const LoadingCardPost = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '0 auto',
        width: 400,
      }}
    >
      <CardPost loading name="" time={new Date()} title="" username="" />
    </div>
  );
};
