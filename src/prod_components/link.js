import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '@components'
import { Button } from 'antd'
import { useSelector } from 'react-redux'

export default ({ children, to = "", linkType, onClick, id, ...props }) => {
	switch(linkType) {
		case 'button':
			return (
				<Link onClick={onClick} to={to} >
					<Button {...props} >
						{children}
					</Button>
				</Link>
			)
		case 'user':
			const user = useSelector(state => state.Users.users[id])
			if(user) return (
				!user.details ?
				<code>[deleted]</code>
				:
				<Link to={"/u/" + user.details.username} {...props}>
					{user.details.name}
				</Link>
			);
			else return <code>{id === undefined ? "[deleted]" : "Loading..."}</code>
		default:
			return (
				<Link onClick={onClick} to={to} >
					{children}
				</Link>
			)
	}
}
