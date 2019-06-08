import React from 'react'
import { FilterAndPosts, Post, Wiki } from 'containers'

const Hypagora = ({ route, filter, hypagora }) => {
	let inner
	switch(route) {
		case "comments":
			inner = <Post comments id={filter.id} />
			break
		case "wiki":
			inner = <Wiki hypagora={hypagora} />
			break
		default:
			inner = <FilterAndPosts filter={filter} hypagora={hypagora} />
			break
	}
	return (
		<div>
			{inner}
		</div>
	)
}

export default Hypagora
