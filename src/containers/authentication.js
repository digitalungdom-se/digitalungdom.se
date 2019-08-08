import React, { Component } from 'react'
import actions from 'actions/auth'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
// import {
// 	Link,
// 	ProfileBox
// } from '@components'
import Link from '@components/link'
import ProfileBox from '@components/profilebox'
import { Row, Col } from '@components/grid'

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
		if(profile.username) return (
			<ProfileBox
				profile={profile}
				logOut={this.props.logOut}
				translations={{
					"Log out": t("Log out")
				}}
			/>
		)
		else return (
			<Row
				type="flex"
				justify="space-between"
			>
				<Col>
					<Link
						linkType="button"
						to={"/" + t("login")}
					>
						{t("Log in")}
					</Link>
				</Col>
				<Col>
					<Link
						linkType="button"
						to={"/" + t("register")}
						type="primary"
					>
						{t("Register")}
					</Link>
				</Col>
			</Row>
		)
	}
}

export default withTranslation()(
	connect(mapStateToProps, mapDispatchToProps)(Authentication)
)
