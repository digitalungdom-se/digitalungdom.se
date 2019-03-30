import React from 'react'

const Subreddit = ({match}) => {
	console.log(match)
	return (
		<div>
			{JSON.stringify(match)}
		</div>
	)
}

export default Subreddit
