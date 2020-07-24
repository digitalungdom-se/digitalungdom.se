import Comment from './Comment';
import React from 'react';
import StoryMetadata from 'components/StoryMetadata';

const story: StoryMetadata = {
  component: Comment,
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
  title: 'Comment',
};

export default story;

export const Basic = (): JSX.Element => {
  return <Comment author="Douglas Bengtsson" text={'Hej!'} time={new Date()} />;
};

export const Folded = (): JSX.Element => {
  return <Comment author="Douglas Bengtsson" folded text={'Hej!'} time={new Date()} />;
};

export const CommentTree = (): JSX.Element => {
  return (
    <div style={{ width: 370 }}>
      <Comment author="Douglas Bengtsson" text="Hej!" time={new Date()}>
        <Comment author="Simon Sondén" text="Tjena!" time={new Date()}>
          <Comment author="Kelvin Szolnoky" text="G'day mate!" time={new Date()} />
        </Comment>
        <Comment author="Charles Maddock" text="Tjenixen!" time={new Date()} />
      </Comment>
    </div>
  );
};
