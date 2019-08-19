import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import ProfileBox from '@components/profileBox'

storiesOf('Agora/ProfileBox', module)
	.addDecorator(story => (
	    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
	))
  .add('Post', () => (
    <ProfileBox/>
  ))
