import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'actions/users'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'

function UserContainer({ username }) {

	const user = useSelector(state => state.Users.usernames[username])
	if(user === undefined) {
		const dispatch = useDispatch()
		dispatch(getUser({username}))
	}

  console.log(user);

	return (
		<UserPage loading={!user} user={user} />
	)
}

export default UserContainer
