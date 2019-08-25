import React from 'react'

import { storiesOf } from '@storybook/react';
import Empty from '@components/Empty'
import ProfileDropdown from '@components/ProfileDropdown'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('Miscellaneous', module)
	.addDecorator(withKnobs)
	.add("Empty", () => (
		<Empty
			description="Inga inlägg hittades med detta filter!"
		/> 
	))
	.add("Profile dropdown", () => {
		const name = text('Name', 'Arunoda Susiripala');
		const age = number('Age', 89);

		return (
			<ProfileDropdown
				name={name}
				age={age}
			/> 
		)}
	)
