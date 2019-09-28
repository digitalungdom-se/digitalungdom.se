import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Auth as actions } from 'actions'
// import actions from 'actions/auth'
// import { Login } from '@components'
import Login from '@components/login'
import ResetPassword from '@components/ResetPassword'
import { withTranslation } from 'react-i18next'
import { login, forgotPassword } from 'actions/auth'

// const mapDispatchToProps = dispatch => ({
// 	login: credentials => dispatch(actions.login(credentials))
// })

// const mapStateToProps = state => ({
// 	Auth: state.Auth
// })
function renderSlides(currentSlide, changeSlide, dispatchLogin, dispatchForgotPassword, t){
	switch (currentSlide) {
		case 0:
			return(
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
					forgotPassword={()=> changeSlide(1)}
					// Auth={Auth}
				/>
			)
		case 1:
			return(
				<ResetPassword
					sendForgottonPasswordMail = {dispatchForgotPassword}
					backToLogin = {()=> changeSlide(0)}
				/>
			)
	}
}

export default withTranslation()(
	({ t, onAuthorized = () => true }) => {
		const [ currentSlide, changeSlide ] = useState(0)

		const dispatch = useDispatch()
		const dispatchLogin = info => dispatch(login(info))
		const dispatchForgotPassword = info => {dispatch(forgotPassword(info.email))}

		const { authorized, username } = useSelector(state => ({ authorized: state.Auth.authorized, username: state.Auth.profile.details.username }))
		if(authorized) {
			onAuthorized(username)
		}

    return (
			<div>
				{renderSlides(currentSlide, changeSlide, dispatchLogin, dispatchForgotPassword, t)}
			</div>
		)
	}
)
