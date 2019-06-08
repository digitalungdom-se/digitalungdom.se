import React from 'react'

class Post extends React.Component {

	render() {

		const { post, loading, children } = this.props

		if(loading) return <div>Post loading...</div>;
		const deleted = post.deleted
		// console.log(post.stars)

		return (
			<div>
				<div style={{outline: '1px solid black'}}>
					<h1>{post.title}</h1>
					<div>Modified:{post.modified}</div>
					
					<div>Stars:{post.stars}</div>
					<p>{!deleted ? post.body : "deleted"}</p>
					{post.tags ?
						<ul>
							{post.tags.map(tag => <li key={tag} >{tag}</li>)}
						</ul>
						: null
					}
					{children}
				</div>
			</div>
		)
	}
	/*<div>Author: {(!deleted && author !== "deleted") ? ((post.display.type === "user") ? author.details.username : author.details.name) : "deleted"}</div>*/
}

export default Post
