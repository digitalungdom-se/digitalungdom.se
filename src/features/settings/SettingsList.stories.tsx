import React, { ReactChildren } from 'react';
import SettingsList, { SettingsTabs } from './SettingsList';

import { Route } from 'react-router-dom';
import StoryMetadata from 'components/StoryMetadata';
import StoryRouter from 'storybook-react-router';

const story: StoryMetadata = {
  component: SettingsList,
  decorators: [(storyFn): JSX.Element => <div style={{ padding: 100 }}>{storyFn()}</div>, StoryRouter()],
  title: 'SettingsList',
};

export default story;

export const List = ({ match }: any): React.ReactElement => {
  return <SettingsList selected={''} />;
};

export const Tabs = (): JSX.Element => {
  return <SettingsTabs selected={''} />;
};
