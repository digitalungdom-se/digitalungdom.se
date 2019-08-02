import React from 'react'
import Reply from '@components/Reply'
import { useDispatch } from 'react-redux'
import Agora from 'actions/agora'

function ReplyContainer({ id }) {
	const dispatch = useDispatch()

	const agorize = info => {
		dispatch(Agora.agorize({
			replyTo: id,
			...info
		}))
	}

	return (
		<Reply
			reply={agorize}
		/>
	)
}

export default ReplyContainer
