import React from 'react'
import { Card, Avatar } from 'antd'
import Loading from '@components/Loading'

function UserPage({ user, loading }) {
	if (loading) return <Loading />
	return (
		 <Card>
		 	<Avatar style={{margin: "0 auto", display: "block"}} size={200} icon="user" />
		 	<h1>{user.details.name}</h1>
		 	<h2>@{user.details.username}</h2>
		 </Card>
	)
}

export default UserPage
