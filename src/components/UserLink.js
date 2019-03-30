import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd'

class UserLink extends Component {
	render() {
		const { user } = this.props
		return (
			// <Popover
			// 	placement="bottom"
			// 	content={
			// 		<div>
			// 			Hello
			// 		</div>
			// 	}
			// >
				<Link className="user-link" to={'/u/' + user.username}>
					{
						this.props.showName ?
							user.name
						: user.username
					}
				</Link>
			// </Popover>
		)
	}
}

UserLink.defaultProps = {
	showName: true
}

export default UserLink
