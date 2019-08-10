import React from 'react'

export default ({ login, Auth, translations }) => (
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
		<input type="text" name="username" placeholder={translations["Username"] + "/" + translations["E-mail"]} />
		<input type="password" name="password" placeholder={translations["Password"]} />
		<button type="submit">{translations["Log in"]}</button>
	</form>
)

/*
<div>
	{Auth.loggingIn && translations["Logging in"] + "..."}<br/>
	{Auth.loginResponse && Auth.loginResponse + ''}<br />
	{Auth.loginResponse === 'fail' && JSON.stringify(Auth.reason)}
</div>
*/
