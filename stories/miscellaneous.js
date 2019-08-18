import React from 'react'

import { storiesOf } from '@storybook/react';
import Empty from '@components/Empty'

storiesOf('Miscellaneous', module)
	.add("Empty", () => (
		<Empty
			description="Inga inlägg hittades med detta filter!"
		/> 
	))
