import React from 'react'

function RegisterForm({dispatch, register}) {
	function submitForm(e) {
		e.preventDefault()
		const {
			name,
			username,
			birthdate,
			email,
			password,
			gender
		} = e.target
		dispatch(register({
			name: name.value,
			username: username.value,
			birthdate: birthdate.value,
			email: email.value,
			password: password.value,
			gender: gender.value
		}))
	}

	return (
		<form
			onSubmit={submitForm}
		>
			<input placeholder="name" name="name" />
			<input placeholder="username" name="username" />
			<input placeholder="birthdate" name="birthdate" />
			<input placeholder="email" name="email" />
			<input placeholder="password" name="password" />
			<input placeholder="gender" name="gender" />
			<button type="submit">Register</button>
		</form>
	)
}

export default RegisterForm
