import React from 'react'
import { Button } from '@components'

export default ({ profile, logOut, translations }) => (
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
		<Button onClick={logOut}>{translations["Log out"]}</Button>
	</div>
)
