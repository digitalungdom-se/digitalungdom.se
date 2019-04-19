import React from 'react'
import { connect } from 'react-redux'
import { Auth as actions } from 'actions'
import { Login } from '@components'
import { withTranslation } from 'react-i18next'

const mapDispatchToProps = dispatch => ({
	login: credentials => dispatch(actions.login(credentials))
})

const mapStateToProps = state => ({
	Auth: state.Auth
})

export default withTranslation()(
	connect(mapStateToProps, mapDispatchToProps)(({ login, Auth, t }) => (
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
				login={login}
				Auth={Auth}
			/>
		</div>
		)
	)
)
