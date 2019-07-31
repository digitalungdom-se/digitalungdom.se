import React from 'react'
import { connect } from 'react-redux'
// import { Settings } from '@components' 
import Settings from '@components/settings' 
// import { Settings as actions } from 'actions'
import actions from 'actions/settings'
import { changeLanguage } from 'i18next'

const mapStateToProps = state => ({
	settings: state.Settings,
})

const mapDispatchToProps = dispatch => ({
	changeTheme: (choice) => dispatch(actions.changeTheme(choice))
})

export default connect(mapStateToProps, mapDispatchToProps)(({ changeTheme, settings }) => (
	<Settings
		changeTheme={changeTheme}
		settings={settings}
		changeLanguage={changeLanguage}
	/>
))