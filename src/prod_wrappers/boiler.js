import React from 'react'
import { Layout, Row, Col } from 'antd'
import 'resources/boiler.css'

const { Content, Header } = Layout

const Logo = () => (
	<h1 className="logo">
		Digital Ungdom
	</h1>
)

const Boiler = ({ children, theme }) => (
	<Layout className={theme}>
		{children}
	</Layout>
)

Boiler.Header = ({ children }) => (
	<Header
		style={{ position: 'fixed', zIndex: 1, width: '100%', height: 60, padding: 0 }}
	>
		<Row
			type="flex"
			justify="space-between"
			style={{height: 60}}
		>
			<Col
				xs={{span: 20, offset: 1}}
				sm={{span: 8, offset: 1}}
				md={{span: 6, offset: 1}}
				lg={{span: 4}}
				className="ant-col"
			>
				<Logo />
			</Col>
			{children}
		</Row>
	</Header>
)

Boiler.Content = ({ children }) => (
	<Content
		className="boiler-content"
	>
		{children}
	</Content>
)

export default Boiler
