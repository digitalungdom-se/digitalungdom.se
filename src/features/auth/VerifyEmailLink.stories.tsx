import React from 'react';
import VerifyEmailLink from './VerifyEmailLink';

const story = {
  component: VerifyEmailLink,
  title: 'VerifyEmailLink',
};

export default story;

export const Loading = (): JSX.Element => <VerifyEmailLink loading />;

export const VerifyingError = (): JSX.Element => <VerifyEmailLink error={new Error()} loading={false} />;

export const VerifyingSuccess = (): JSX.Element => <VerifyEmailLink data={{}} loading={false} />;
