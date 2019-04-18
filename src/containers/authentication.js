import React, { Component } from 'react'
import { Auth as actions } from 'actions'
import { connect } from 'react-redux'
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

		const { profile } = this.props

		return (
			<div>
				{
					profile.username ?
					<ProfileBox
						profile={profile}
						logOut={this.props.logOut}
					/>
					:
					<div>
						<Link to="/logga-in">Logga in</Link>
						<br/>
						<Link to="/bli-medlem">Bli medlem</Link>
					</div>
				}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
