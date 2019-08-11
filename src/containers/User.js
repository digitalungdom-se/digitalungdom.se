import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'actions/users'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'

function UserContainer({ username }) {

	const user = useSelector(state => state.Users.usernames[username])
	console.log(user)
	if(user === undefined) {
		const dispatch = useDispatch()
		dispatch(getUser([username], "username"))
	}

	return (
		<Row
			style={{paddingTop: 24}}
		>
			<Col
				sm={{
					span: 6, offset: 0
				}}
				lg={{
					offset: 4
				}}
			>
				<UserPage
					loading={!user}
					user={user}
				/>
			</Col>
		</Row>
	)
}

export default UserContainer
