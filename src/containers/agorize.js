import React from 'react'
import { Agorize } from '@components'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
	agorize: info => dispatch(actions.agorize(info))
})

export default connect(null, mapDispatchToProps)(({agorize}) => (
	<div>
		<Agorize
			agorize={agorize}
		/>
	</div>
))
