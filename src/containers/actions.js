import React from 'react'
// import { Agora } from 'actions'
import Agora from 'actions/agora'
// import { Actions } from '@components'
import Actions from '@components/actions'
import { useDispatch, useSelector } from 'react-redux'

const ActionsContainer = ({ ...props }) => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.Auth._id)

	return (
		<Actions
			{...props}
			userId={userId}
			dispatch={dispatch}
			asteri={Agora.asteri}
			meta_agorize={Agora.meta_agorize}
			agorize={Agora.agorize}
			report={Agora.report}
			anti_agorize={Agora.anti_agorize}
		/>
	)
}

export default ActionsContainer
