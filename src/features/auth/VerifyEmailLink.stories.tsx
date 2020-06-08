import React from 'react';
import StoryMetadata from 'components/StoryMetadata';
import { VerifyEmailLink } from './VerifyEmailLink';

const story: StoryMetadata = {
  component: VerifyEmailLink,
  decorators: [(storyFn): JSX.Element => <div style={{ padding: 100 }}>{storyFn()}</div>],
  title: 'VerifyEmailLink',
};

export default story;

export const Loading = (): JSX.Element => <VerifyEmailLink loading />;

export const VerifyingError = (): JSX.Element => <VerifyEmailLink error={new Error()} loading={false} />;

export const VerifyingSuccess = (): JSX.Element => <VerifyEmailLink data={{}} loading={false} />;
