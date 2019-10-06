import React from 'react'
import Actions from 'containers/actions'
import Link from '@components/link'

const Comment = ({ comment, children, isAuthor }) => {
	return (
		<li
			style={{listStyleType: "none"}}
		>
			<Link linkType="user" id={comment.author} />
			<span> {comment.stars} stjärnor</span>
			<p>
				{comment.body}
				{comment.deleted && "[raderad]"}
			</p>
			<Actions
				id={comment._id}
				isAuthor={isAuthor}
			/>
			<ul
				style={{paddingLeft: 30}}
			>
				{children}
			</ul>
		</li>
	)
}

export default Comment
