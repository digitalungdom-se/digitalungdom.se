import AgoraFilter from './AgoraFilter';
import React from 'react';
import { Route } from 'react-router-dom';

const story = {
  component: AgoraFilter,
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
