import React from 'react'
import { Link } from '@components'
import { Comments } from 'containers'

class Post extends React.Component {
	render() {

		const { post, comments, link, loading } = this.props

		if(loading) return <div>Post loading...</div>

		return (
			<div>
				<div style={{outline: '1px solid black'}}>
					<h1>{post.title}</h1>
					<Link
						to={link}
					>
						Comments
					</Link>
				</div>
				<div>
				{JSON.stringify(post)}
				</div>
				{
					comments &&
					<Comments comments={post.comments} />
				}
			</div>
		)
	}
}

export default Post
