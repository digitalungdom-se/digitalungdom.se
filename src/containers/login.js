import React from 'react'
import { connect, useDispatch } from 'react-redux'
// import { Auth as actions } from 'actions'
// import actions from 'actions/auth'
// import { Login } from '@components'
import Login from '@components/login'
import { withTranslation } from 'react-i18next'
import { login } from 'actions/auth'

// const mapDispatchToProps = dispatch => ({
// 	login: credentials => dispatch(actions.login(credentials))
// })

// const mapStateToProps = state => ({
// 	Auth: state.Auth
// })

export default withTranslation()(
	({ t }) => {

		const dispatch = useDispatch()

		const dispatchLogin = info => dispatch(login(info))

		return (
			<div>
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
					// Auth={Auth}
				/>
			</div>
		)
	}
)
