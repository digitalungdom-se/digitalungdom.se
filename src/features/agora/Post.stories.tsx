import { BodyEditState } from './AgoraBodyField';
import { LoremIpsum } from 'lorem-ipsum';
import Post from './Post';
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
  return <Post time={new Date()} title="Hello, world!" />;
};

export const ShortBody = (): JSX.Element => {
  return <Post body="It's a pleasure to meet you." time={new Date()} title="Hello, world!" />;
};

export const LinkPost = (): JSX.Element => {
  return <Post body={'https://digitalungdom.se'} time={new Date()} title="Hello, world!" type="LINK" />;
};

export const Card = (): JSX.Element => {
  return (
    <div style={{ width: 400 }}>
      <Post body="https://digitalungdom.se" time={new Date()} title="Hello, world!" type="LINK" />
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
      <Post body={lorem.generateSentences(5)} time={new Date()} title="Hello, world!" />
    </div>
  );
};

export const LoadingPost = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '0 auto',
        width: 400,
      }}
    >
      <Post loading />
    </div>
  );
};

export const IsAuthorPost = (): JSX.Element => {
  const [state, setState] = React.useState<BodyEditState>({ body: "It's a pleasure to meet you." });
  return (
    <div
      style={{
        margin: '0 auto',
        width: 400,
      }}
    >
      <Post
        body={state.body}
        handleEdit={(values, { setSubmitting }): void => {
          setTimeout(() => {
            setSubmitting(false);
            setState(values);
          }, 1000);
        }}
        isAuthor
        time={new Date()}
        title="Hello, world!"
      />
    </div>
  );
};
