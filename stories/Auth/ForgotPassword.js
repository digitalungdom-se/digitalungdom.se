import React from 'react'
import { storiesOf } from '@storybook/react';

import ForgotPassword from '@components/ForgotPassword'

storiesOf('Auth/ForgotPassword', module)
  .add('Reset Password', () => (
  	<ForgotPassword/>
  ))
