import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '@components'
import { Popover } from 'antd'
import Button from '@components/button'
import { useSelector } from 'react-redux'

export default ({ children, to, type, onClick, ...props }) => {
	switch(type) {
		case 'button':
			return (
				<Link onClick={onClick} to={to} >
					<Button>
						{children}
					</Button>
				</Link>
			)
		case 'user':
			const user = useSelector(state => state.Users.users[props.id])
			return (
				<Popover content={<div><h1>{user.username}</h1></div>}>
					<Link to={"/u/" + user.username}>
						{user.username}
					</Link>
				</Popover>
			)
		default:
			return (
				<Link onClick={onClick} to={to} >
					{children}
				</Link>
			)
	}
}
