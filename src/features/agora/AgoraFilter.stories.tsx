import AgoraFilter from './AgoraFilter';
import React from 'react';
import { Route } from 'react-router-dom';
import StoryMetadata from 'components/StoryMetadata';

const story: StoryMetadata = {
  component: AgoraFilter,
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
  title: 'AgoraFilter',
};

export default story;

export const Basic = (): JSX.Element => {
  return (
    <Route path="/:sort?">
      {({ match }): React.ReactElement => <AgoraFilter hypagora="general" path="/" sort={match?.params.sort} />}
    </Route>
  );
};
