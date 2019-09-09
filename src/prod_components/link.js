import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// import { Button } from '@components'
import { Button } from 'antd'

export default ({ children, to = "", linkType, onClick, id, user, ...props}) => {
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
			if(user) return (
				!user.details ?
					<code>[deleted]</code>
				:
					<Link to={"/@" + user.details.username} {...props}>
						{user.details.name}
					</Link>
			);
			else return <code>{id === undefined ? "[deleted]" : "Loading..."}</code>
		case 'navigation':
			return(
				<NavLink
				onClick={onClick}
				to={to}
				style={{color: "grey"}}
				activeStyle={{
					color: "rgb(30,110,232)"
				}}
				{...props}>
					{children}
				</NavLink>
			)
		default:
			return (
				<Link onClick={onClick} to={to} {...props}>
					{children}
				</Link>
			)
	}
}
