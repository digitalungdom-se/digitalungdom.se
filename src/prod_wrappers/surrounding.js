import React from 'react'
import { Row, Col } from 'antd'

const Surrounding = ({children, hypagora_info}) =>(
	<Row
		className="agora-surrounding"
		style={{
			background: hypagora_info.background,
		}}
	>
		{children}
	</Row>
)

Surrounding.Widgets = ({children}) => (
	<Col
		xs={0}
		sm={{span: 0}}
		md={{span: 7}}
		lg={{span: 6, offset: 1}}
	>
		{children}
	</Col>
)

Surrounding.Children = ({children}) => (
	<Col
		xs={{ span: 24 }}
		sm={{ span: 24 }}
		md={{ span: 17, offset: 0 }}
		lg={{ span: 14, offset: 2 }}
	>
		{children}
	</Col>
)

export default Surrounding
