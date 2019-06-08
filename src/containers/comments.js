import React from 'react'
import { Comment } from 'containers'

const Comments = ({ children }) => {
	return children.map(child => (
		<Comment
			key={child}
			id={child}
		/>
	))
}

export default (Comments)
