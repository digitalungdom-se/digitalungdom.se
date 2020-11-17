import SettingsList, { SettingsTabs } from './SettingsList';

import React from 'react';
import { Route } from 'react-router-dom';
import StoryMetadata from 'components/StoryMetadata';
import StoryRouter from 'storybook-react-router';

// const Router = ({ Child }: { Child: React.ComponentType<any> }): React.ReactElement => (
//   <Route path="/settings/:section">
//     ({match}) => <Child selected={match?.params.section} />
//   </Route>
// );

const story: StoryMetadata = {
  component: SettingsList,
  decorators: [
    (storyFn): JSX.Element => (
      <div style={{ padding: 100, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
    // StoryRouter(),
  ],
  title: 'SettingsList',
};

export default story;

// export const RoutedList = () => <Router Child={SettingsList} />;

// export const RoutedTabs = () => <Router Child={SettingsTabs} />;
