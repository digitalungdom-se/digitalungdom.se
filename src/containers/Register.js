import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, checkEmail, checkUsername } from 'actions/register.js'
import RegisterForm from '@components/RegisterForm'

function Register() {
	const dispatch = useDispatch()
	const username = useSelector(state => state.Auth.username)
	const checkingUsername = useSelector(state => state.Register.checkingUsername)
	const checkingEmail = useSelector(state => state.Register.checkingEmail)
	const registering = useSelector(state => state.Register.registering)
	return (
		<RegisterForm
			dispatch={dispatch}
			register={register}
			checkUsername={checkUsername}
			checkEmail={checkEmail}
			username={username}
			checkingUsername={checkingUsername}
			checkingEmail={checkingEmail}
			registering={registering}
		/>
	)
}

export default Register
