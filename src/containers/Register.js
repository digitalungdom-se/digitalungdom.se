import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, checkEmail, checkUsername } from 'actions/register.js'
import RegisterForm from '@components/RegisterForm'

function Register() {
	const dispatch = useDispatch()
	const dispatchCheckUsername = username => dispatch(checkUsername(username))
	const dispatchCheckEmail = email => dispatch(checkEmail(email))
	const dispatchRegister = email => dispatch(register(email))
	const username = useSelector(state => state.Auth.username)
	const usernameAvailable = useSelector(state => state.Register.usernameAvailable)
	const emailAvailable = useSelector(state => state.Register.emailAvailable)
	const checkingUsername = useSelector(state => state.Register.checkingUsername)
	const checkingEmail = useSelector(state => state.Register.checkingEmail)
	const registering = useSelector(state => state.Register.registering)
	return (
		<RegisterForm
			dispatch={dispatch}
			register={dispatchRegister}
			checkUsername={dispatchCheckUsername}
			checkEmail={dispatchCheckEmail}
			username={username}
			checkingUsername={checkingUsername}
			checkingEmail={checkingEmail}
			registering={registering}
			usernameAvailable={usernameAvailable}
			emailAvailable={emailAvailable}
		/>
	)
}

export default Register
