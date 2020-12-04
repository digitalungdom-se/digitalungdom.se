import React from 'react';
import StoryMetadata from 'components/StoryMetadata';
import VerifyEmailPage from './VerifyEmailPage';

const story: StoryMetadata = {
  component: VerifyEmailPage,
  decorators: [(storyFn): JSX.Element => <div style={{ padding: 100, textAlign: 'center' }}>{storyFn()}</div>],
  title: 'VerifyEmailPage',
};

export default story;

export const Basic = (): JSX.Element => <VerifyEmailPage onSubmit={() => new Promise((res) => res())} />;
