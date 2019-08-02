import React from 'react'
// import { Actions, Comments } from 'containers'
import Comments from 'containers/comments'
// import { Comment } from '@components'
import Comment from '@components/comment'
import { useSelector, useDispatch } from 'react-redux'
import Agora from 'actions/agora'

const CommentContainer = ({ level, id }) => {
	const comment = useSelector(state => state.Agora.agoragrams[id])
	const dispatch = useDispatch()

	return (
		<Comment
			comment={comment}
			level={level}
			asteri={Agora.asteri}
			dispatch={dispatch}
		>
			{
				comment.children.length !== 0 &&
				<Comments level={level + 1} children={comment.children} />
			}
		</Comment>
	)
}

export default CommentContainer
