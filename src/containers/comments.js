import React from 'react'
// import { Comment } from 'containers'
import Comment from 'containers/comment'

const Comments = ({ children, level }) => {
	return children.map(child => (
		<Comment
			key={child}
			id={child}
			level={level}
		/>
	))
}

export default (Comments)
