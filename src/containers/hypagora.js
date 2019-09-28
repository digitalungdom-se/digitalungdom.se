import React from 'react'
// import { FilterAndPosts, Post, Wiki } from 'containers'
import Wiki from 'containers/wiki'
import Post from 'containers/post'
import FilterAndPosts from 'containers/filterandposts'
import Posts from 'containers/posts'

const Hypagora = ({ route, id, hypagora = "general" }) => {
	let inner

	switch(route) {
		case "comments":
			inner = <Post showComments id={id} />
			break
		case "wiki":
			inner = <Wiki hypagora={hypagora} />
			break
		default:
			// inner = <FilterAndPosts filter={filter} hypagora={hypagora} />
			inner = <Posts hypagora={hypagora}/>
			break
	}
	return (
		<div>
			{inner}
		</div>
	)
}

export default Hypagora
