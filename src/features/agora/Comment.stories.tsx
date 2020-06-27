import Comment from './Comment';
import React from 'react';

const story = {
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
  return <Comment name="Douglas Bengtsson" text={'Hej!'} time={new Date()} username="Nautman" />;
};

export const CommentTree = (): JSX.Element => {
  return (
    <Comment name="Douglas Bengtsson" text="Hej!" time={new Date()} username="Nautman">
      <Comment name="Simon Sondén" text="Tjena!" time={new Date()} username="Zigolox">
        <Comment name="Kelvin Szolnoky" text="G'day mate!" time={new Date()} username="kelszo" />
      </Comment>
      <Comment name="Charles Maddock" text="Tjenixen!" time={new Date()} username="charles" />
    </Comment>
  );
};
