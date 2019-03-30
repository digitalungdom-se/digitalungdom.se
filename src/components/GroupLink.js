import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GroupLink extends Component {
	render() {

		const { subreddit } = this.props

		return (
			<Link className="group-link" to={"/agora/r/" + subreddit}>
				{ 'r/' + subreddit}
			</Link>
		)
	}
}

export default GroupLink
