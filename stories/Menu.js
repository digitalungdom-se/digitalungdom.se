import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom'

import Menu from '@components/menu.js'

storiesOf('Menu', module)
	.addDecorator(story => (
	    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
	))
  .add('Horizontal', () => (
    <Menu
    	links={{
    		"/agora": "Agora",
    		"/about-us": "Om oss",
    	}}
    	active={"/agora"}
    />
  ));
