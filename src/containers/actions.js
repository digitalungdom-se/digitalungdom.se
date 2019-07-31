import React from 'react'
// import { Agora } from 'actions'
import Agora from 'actions/agora'
// import { Actions } from '@components'
import Actions from '@components/actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => ({
	asteri: id => dispatch(Agora.asteri(id)),
	meta_agorize: info => dispatch(Agora.meta_agorize(info)),
	agorize: info => dispatch(Agora.agorize(info)),
	report: info => dispatch(Agora.report(info)),
	anti_agorize: id => dispatch(Agora.anti_agorize(id)),
})

const ActionsContainer = ({ id, link, ...actions }) => {
	return (
		<Actions
			id={id}
			actions={actions}
			link={link}
		/>
	)
}

export default connect(null, mapDispatchToProps)(ActionsContainer)
