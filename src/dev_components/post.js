import React from 'react'
import Link from '@components/link'
import Actions from '@components/actions'
import Button from '@components/button'
import moment from 'moment'
import 'moment/locale/sv'

function Post({ link, post, loading, children, asteri, anti_agorize, report }) {
	console.log(moment.locale('sv'))

	if(loading) return <div>Post loading...</div>;
	const deleted = post.deleted
	// console.log(post.stars)

	return (
		<div>
			<div style={{outline: '1px solid black'}}>
				<h1>{post.title}</h1>
				<div>Modified:{post.modified}</div>
				<div>{moment().format('Do MMMM YYYY, hh:mm:ss')}</div>
				<Link linkType="user" id={post.author} />
				<div>Stars:{post.stars}</div>
				<p>{!deleted ? post.body : "deleted"}</p>
				{post.tags ?
					<ul>
						{post.tags.map(tag => <li key={tag} >{tag}</li>)}
					</ul>
					: null
				}
				<Actions
					like={() => asteri(post._id)}
					remove={() => anti_agorize(post._id)}
					report={(reason) => report({reason, _id: post._id})}
					link={link}
				/>
				{children}
			</div>
		</div>
	)
}

// class Post extends React.Component {

// 	render() {

		
// 		)
// 	}
	/*<div>Author: {(!deleted && author !== "deleted") ? ((post.display.type === "user") ? author.details.username : author.details.name) : "deleted"}</div>*/
// }

export default Post
