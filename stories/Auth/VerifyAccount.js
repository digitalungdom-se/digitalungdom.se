import React from 'react'
import { storiesOf } from '@storybook/react';

import VerifyAccount from '@components/VerifyAccount'

storiesOf('Auth/VerifyAccount', module)
  .add('Reset Password', () => (
  	<VerifyAccount/>
  ))
