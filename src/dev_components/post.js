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
						to={"/agora/r/minecraft/comments/" + link + "/title"}
					>
						Comments
					</Link>
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
