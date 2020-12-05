import { Paper } from '@material-ui/core';
import React from 'react';
import VerifyEmailPage from './VerifyEmailPage';

const story = {
  component: VerifyEmailPage,
  title: 'VerifyEmailPage',
};

export default story;

export const Basic = (): JSX.Element => (
  <Paper>
    <VerifyEmailPage
      email="john@smith.com"
      onSubmit={(): Promise<void> => new Promise((res) => setTimeout(res, 1000))}
    />
  </Paper>
);
