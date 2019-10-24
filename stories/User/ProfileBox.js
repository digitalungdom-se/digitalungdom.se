import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import ProfileBox from '@components/profilebox'

storiesOf('User', module)
	.addDecorator(story => (
	    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
	))
  .add('ProfileBox', () => (
    <ProfileBox/>
  ))
