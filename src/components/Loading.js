import React from 'react'
import { Spin, Icon, Card, Row, Col } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

const sizes = {
	style: { padding: 40 },
	lg: { span: 12 },
	md: { span: 18 },
	sm: { span: 24 },
	xs: { span: 24 },
}

const Loading = () => (
	<Row
		justify="center"
		type="flex"
	>
		<Col
			{...sizes}
		>
			<Card style={{
				margin: '20px 0px',
				textAlign: 'center',
				padding: '50px'
			}}>
				<Spin indicator={antIcon} />
			</Card>
		</Col>
	</Row>
)

export default Loading
