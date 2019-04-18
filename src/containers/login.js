import React from 'react'
import { connect } from 'react-redux'
import { Auth as actions } from 'actions'
import { Login } from '@components'

const mapDispatchToProps = dispatch => ({
	login: credentials => dispatch(actions.login(credentials))
})

const mapStateToProps = state => ({
	Auth: state.Auth
})

export default connect(mapStateToProps, mapDispatchToProps)(({ login, Auth }) => (
	<div>
		<Login
			login={login}
			Auth={Auth}
		/>
	</div>
))
