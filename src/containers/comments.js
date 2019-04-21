import React from 'react'
import { connect } from 'react-redux'
import { Agora as actions } from 'actions'

const Comments = ({ comments }) => (
	<ul>
		{comments.map(comment => (
			<li key={comment._id}>
				<p style={{wordBreak: "break-all"}}>{comment.body}</p>
				{comment.comments &&
					<Comments comments={comment.comments} />
				}
			</li>
		))}
	</ul>
)

export default Comments