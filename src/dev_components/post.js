import React from 'react'
import { Link } from '@components'
import { Comments } from 'containers'

class Actions extends React.Component {
	render() {
		const { link, asteri, id, anti_agorize, report } = this.props.actions
		return (
			<div>
				<button onClick={e => asteri({postId: id})}>Asteri</button>
				<button onClick={e => anti_agorize({postId: id})}>anti_agorize</button>
				<button onClick={e => {
					const reason = prompt('Why bro?')
					report({postId: id, reason})
				}}>Report</button>
				<Link
					to={link}
				>
					Comments
				</Link>
		</div>
		)
	}
}

class Post extends React.Component {

	render() {

		const { post, comments, link, loading, author, actions } = this.props

		if(loading || author === undefined) return <div>Post loading...</div>;
		const deleted = post.deleted

		return (
			<div>
				<div style={{outline: '1px solid black'}}>
					<h1>{post.title}</h1>
					<div>Modified:{post.modified}</div>
					<div>Author: {!deleted ? (post.display.type === "user" ? author.details.username : author.details.name) : "deleted"}</div>
					<p>{!deleted ? post.body : "deleted"}</p>
					{post.tags ?
						<ul>
							{post.tags.map(tag => <li key={tag} >{tag}</li>)}
						</ul>
						: null
					}
					<Actions actions={actions} />
					{
						comments &&
						<Comments comments={post.comments} />
					}
				</div>
			</div>
		)
	}
}

export default Post
