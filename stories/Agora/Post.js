import React from 'react'
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import Post from '@components/post'

const post = {
	_id: "54759eb3c090d83494e2d804",
	tags: [],
	hypagora: "general",
	body: "This is a body.",
	title: "Hello, world!",
	stars: 1,
	commentAmount: 2,
}

const user = {
	details: {
		name: "Douglas Bengtsson",
		username: "Nautman"
	}
}

storiesOf('Agora/Post', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
	    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
	))
	.add('Loading post', () => (
		<Post
			loading={true}
		/>
	))
	.add('Post', () => {
		const stars = number('Stars', 1)

		return (
			<Post
				post={{
					...post,
					stars
				}}
				showProfilePicture={false}
				user={user}
				asteri={action("starred")}
			/>
		)
	})