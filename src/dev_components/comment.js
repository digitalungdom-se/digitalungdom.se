import React from 'react'

const Comment = ({ comment, children }) => {
	return (
		<li>
			{JSON.stringify(comment)}
			{children}
		</li>
	)
}

export default Comment
