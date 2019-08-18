import React from 'react'
import { useSelector } from 'react-redux'
import Link from '@components/link'

export default ({ linkType, id, ...props}) => {
	switch(linkType) {
		case 'user':
			const user = useSelector(state => state.Users.users[id])
			if(user) return (
				!user.details ?
					<Link
						linkType={linkType}
						id={id}
						{...props}
					>
						[deleted]
					</Link>
				:
				<Link to={"/@" + user.details.username} {...props}>
					{user.details.name}
				</Link>
			);
			else return <code>{id === undefined ? "[deleted]" : "Loading..."}</code>
		default:
			return (
				<Link
					linkType={linkType}
					id={id}
					{...props}
				/>
			)
	}
}

