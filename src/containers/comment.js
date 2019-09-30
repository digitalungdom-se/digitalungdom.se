import React from 'react'
// import { Actions, Comments } from 'containers'
import Comments from 'containers/comments'
// import { Comment } from '@components'
import Comment from '@components/comment'
import { useSelector, useDispatch } from 'react-redux'
import { asteri } from 'actions/agora'

const CommentContainer = ({ level, id, child}) => {
	const comment = useSelector(state => state.Agora.agoragrams[id])
	const author = useSelector(state => state.Auth.profile.details._id)
	const dispatch = useDispatch()
	const dispatchAsteri = id => dispatch(asteri(id))
	const isAuthor = author === comment.author

	return (
		<Comment
			comment={comment}
			level={level}
			asteri={dispatchAsteri}
			dispatch={dispatch}
			isAuthor={isAuthor}
		>
			{
				comment.children.length !== 0 &&
				<Comments level={level + 1} children={comment.children} />
			}
		</Comment>
	)
}

export default CommentContainer
