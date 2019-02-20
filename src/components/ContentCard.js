import React from 'react'
import { Card, Col, Row } from 'antd'

const sizes = {
	lg: { span: 12 },
	md: { span: 18 },
	sm: { span: 24 },
	xs: { span: 24 },
}

class ContentCard extends React.Component {
	render() {
		return (
			<Row
				justify="center"
				type="flex"
				style={{width: '100%'}}
			>
				<Col
					{...sizes}
				>
					<Card
						style={{ marginTop: 20, padding: 20}}
					>
						{this.props.children}
					</Card>
				</Col>
			</Row>
		)
	}
}

export default ContentCard
