import React from 'react'
import { Row, Col, Card, Avatar } from 'antd'
import Loading from '@components/Loading'

function UserPage({ user, loading }) {
	if (loading) return <Loading />
	return (
	 <Row
	 	style={{paddingTop: 24}}
	 	justify="center"
	 	type="flex"
	 >
	 	<Col
	 		sm={{span: 18}}
	 		lg={{span: 6}}
	 		// sm={{
	 		// 	span: 6, offset: 0
	 		// }}
	 		// lg={{
	 		// 	offset: 4
	 		// }}
	 	>
	 	<div
			style={{
				background: "white",
				border: "1px solid #e8e8e8",
				borderRadius: 4
			}}
		>
			<div
				style={{
					background: "#1051c2",
					height: 80,
					borderTopRightRadius: 4,
					borderTopLeftRadius: 4
				}}
			/>
			<div
				style={{
					paddingLeft: 24,
					paddingBottom: 24
				}}
			>
				<Avatar style={{marginTop: -40, display: "block",}} size={80} icon="user" />
				<h2>{user.details.name}</h2>
				<span style={{fontSize:16}}>@{user.details.username}</span>
				<div>Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}</div>
			</div>
		 </div>
	 	</Col>
	 </Row>
	)
}

export default UserPage
