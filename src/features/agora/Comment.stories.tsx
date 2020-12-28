import Comment from './Comment';
import React from 'react';

const story = {
  component: Comment,
  title: 'Comment',
};

export default story;

export const Basic = (): JSX.Element => {
  return <Comment author="Douglas Bengtsson" body={'Hej!'} time={new Date()} />;
};

export const Folded = (): JSX.Element => {
  return <Comment author="Douglas Bengtsson" body={'Hej!'} folded time={new Date()} />;
};

export const CommentTree = (): JSX.Element => {
  return (
    <div style={{ width: 370 }}>
      <Comment author="Douglas Bengtsson" body="Hej!" time={new Date()}>
        <Comment author="Simon Sondén" body="Tjena!" time={new Date()}>
          <Comment author="Kelvin Szolnoky" body="G'day mate!" time={new Date()} />
        </Comment>
        <Comment author="Charles Maddock" body="Tjenixen!" time={new Date()} />
      </Comment>
    </div>
  );
};
