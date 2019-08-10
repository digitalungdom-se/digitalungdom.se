import React from 'react'
// import { Button } from '@components'
import Button from '@components/button'

export default ({ profile, logout, translations }) => (
	<div>
		<div>
			Logged in as: {profile.username}
		</div>
		<Button onClick={logout}>{translations["Log out"]}</Button>
	</div>
)
