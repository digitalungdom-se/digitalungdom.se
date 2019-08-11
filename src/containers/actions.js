import React from 'react'
// import { Agora } from 'actions'
import { reportAgoragram, antiAgorize, asteri }from 'actions/agora'
// import { Actions } from '@components'
import Actions from '@components/actions'
import { useDispatch, useSelector } from 'react-redux'

const ActionsContainer = ({ id, ...props }) => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.Auth._id)
	const liked = useSelector(state => state.Agora.starredAgoragrams.indexOf(id) !== -1)

	const like = () => dispatch(asteri(id))
	const report = (reason) => dispatch(reportAgoragram(id, reason))
	const remove = () => dispatch(antiAgorize(id))
	const agorized = useSelector(state => state.Agora.agorized.indexOf(id) !== -1)
	const likes = useSelector(state => state.Agora.agoragrams[id].stars)
	const replies = useSelector(state => state.Agora.agoragrams[id].children.length)

	return (
		<Actions
			{...props}
			id={id}
			userId={userId}
			like={like}
			liked={liked}
			likes={likes}
			report={report}
			remove={remove}
			replied={agorized}
			replies={replies}
		/>
	)
}

export default ActionsContainer
