import React, { Component } from 'react'
import { Auth as actions } from 'actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import {
	Link,
	ProfileBox
} from '@components'

const mapStateToProps = (state) => ({
	profile: state.Auth
})

const mapDispatchToProps = (dispatch) => ({
	auth: (details, fakeResponse) => dispatch(actions.auth(details, fakeResponse)),
	logOut: () => dispatch(actions.logOut())
})

class Authentication extends Component {
	componentWillMount() {
		this.props.auth(null)
	}

	render() {

		const { profile, t } = this.props

		return (
			<div>
				{
					profile.username ?
					<ProfileBox
						profile={profile}
						logOut={this.props.logOut}
						translations={{
							"Log out": t("Log out")
						}}
					/>
					:
					<div>
						<Link to={"/" + t("links.login")}>{t("Log in")}</Link>
						<br/>
						<Link to={"/" + t("links.register")}>{t("Register")}</Link>
					</div>
				}
			</div>
		)
	}
}

export default withTranslation()(
	connect(mapStateToProps, mapDispatchToProps)(Authentication)
)