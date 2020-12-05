import SettingsList from './SettingsList';
// import { Route } from 'react-router-dom';
// import StoryRouter from 'storybook-react-router';

// const Router = ({ Child }: { Child: React.ComponentType<any> }): React.ReactElement => (
//   <Route path="/settings/:section">
//     ({match}) => <Child selected={match?.params.section} />
//   </Route>
// );

const story = {
  component: SettingsList,
  decorators: [
    // StoryRouter(),
  ],
  title: 'SettingsList',
};

export default story;

// export const RoutedList = () => <Router Child={SettingsList} />;

// export const RoutedTabs = () => <Router Child={SettingsTabs} />;
