import React from 'react'

function UserPage({ user, loading }) {
	if(loading) return <div>Loading...</div>
	return (
		<div>
			<h1>{user.details.name}</h1>
			<h2>{user.details.username}</h2>
		</div>
	)
}

export default UserPage
