import React from 'react'

export default ({ login, Auth }) => (
	<form
		onSubmit={(e) => {
			e.preventDefault()
			const { username, password } = e.target
			login({
				username: username.value,
				password: password.value
			})
		}}
	>
		<input type="text" name="username" placeholder="username/e-mail" />
		<input type="password" name="password" placeholder="password" />
		<button type="submit">Login</button>
		<div>
			{Auth.loggingIn && 'Logging in...'}<br/>
			{Auth.loginResponse && Auth.loginResponse + ''}<br />
			{Auth.loginResponse === 'fail' && JSON.stringify(Auth.reason)}
		</div>
	</form>
)
