import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '@components/login'
import { withTranslation } from 'react-i18next'
import { login } from 'actions/auth'


export default withTranslation()(
	({ t, onAuthorized = () => true }) => {

		const dispatch = useDispatch()
		const dispatchLogin = info => dispatch(login(info))

		const { authorized, username } = useSelector(state => ({ authorized: state.Auth.authorized, username: state.Auth.profile.details.username }))
		const loggingInError = useSelector(state => state.Auth.loggingInError)
		const loggingIn = useSelector(state => state.Auth.loggingIn)

		if(authorized) {
			onAuthorized(username)
		}

    return (
			<Login
				translations={{
					"Log in": t("Log in"),
					"Register": t("Register"),
					"Logging in": t("Logging in"),
					"Password": t("Password"),
					"Username": t("uppercased_noun", {noun: t("Username")}),
					"E-mail": t("lowercased_noun", {noun: t("E-mail")}),
				}}
				login={dispatchLogin}
				loggingInError={loggingInError}
				loggingIn={loggingIn}
			/>
		)
	}
)
