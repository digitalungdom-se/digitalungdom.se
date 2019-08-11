import React from 'react'
import Link from '@components/link'
import Actions from 'containers/actions'
import Button from '@components/button'
import Comments from 'containers/comments'

function Post({
	link,
	post,
	loading,
	children,
	asteri,
	anti_agorize,
	report,
	isAuthor = false,
	comments = false
}) {

	if(loading) return <div>Post loading...</div>;
	const deleted = post.deleted
	// console.log(post.stars)

	return (
		<div>
			<div style={{outline: '1px solid black'}}>
				<h1>{post.title}</h1>
				{
					post.modified &&
					<div>Modified:{post.modified}</div>
				}
				<Link linkType="user" id={post.author} />
				<div>Stars:{post.stars}</div>
				<p>{!deleted ? post.body : "deleted"}</p>
				{post.tags ?
					<ul>
						{post.tags.map(tag => <li key={tag}>{tag}</li>)}
					</ul>
					: null
				}
				<Actions
					report={(reason) => report({reason, _id: post._id})}
					link={link}
					id={post._id}
					isAuthor={isAuthor}
					agoragramType="comment"
					showReplyButton={comments}
				/>
				{

				}
				{
					comments &&
					<Comments
						children={post.children}
					/>
				}
				{children}
			</div>
		</div>
	)
}

export default Post
