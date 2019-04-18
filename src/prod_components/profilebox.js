import React from 'react'
import { Button } from '@components'

export default ({ profile, logOut }) => (
	<div>
		<div>
			{profile.authing && 'Authing...'}
			Logged in as: {
				profile.username ?
					profile.username
					:
					'Loading...'
		}
		</div>
		<Button onClick={logOut}>Logga ut</Button>
	</div>
)
