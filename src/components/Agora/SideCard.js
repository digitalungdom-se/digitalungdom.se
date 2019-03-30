import React from 'react'
import { Card, Button } from 'antd'
import { Link } from 'react-router-dom'

const SideCard = () => (
	<Card>
	<h1>Hem</h1>
	<Link to="/agora/skapa-inlagg">
		<Button
			style={{width: '100%'}}
			type="primary"
		>
			Skapa inlägg
		</Button>
	</Link>
</Card>
)

export default SideCard
