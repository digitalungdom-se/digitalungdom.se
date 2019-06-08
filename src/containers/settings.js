import React from 'react'
import { connect } from 'react-redux'
import { Settings } from '@components' 
import { Settings as actions } from 'actions'
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