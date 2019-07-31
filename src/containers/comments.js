import React from 'react'
// import { Comment } from 'containers'
import Comment from 'containers/comment'

const Comments = ({ children }) => {
	return children.map(child => (
		<Comment
			key={child}
			id={child}
		/>
	))
}

export default (Comments)
