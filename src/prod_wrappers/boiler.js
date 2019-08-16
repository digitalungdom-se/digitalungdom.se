import React from 'react'
import { Layout, Row, Col } from 'antd'
import 'resources/boiler.css'

const { Content, Header, Footer } = Layout

const Boiler = ({ children, theme }) => (
	<Layout className={theme}>

		{children}

	</Layout>
)

const CenterWrapper = ({ children }) => (
	<Row type = "flex" justify="center">
		<Col
		type = "flex"
		justify="center"
		xs={{ span: 22 }}
		sm={{ span: 22 }}
		md={{ span: 20 }}
		lg={{ span: 18 }}
		xl={{ span: 16 }}>
			{children}
		</Col>
	</Row>
)

Boiler.Header = ({ children }) => (
	<Header
		style={{ position: 'fixed', zIndex: 2, width: '100%', height: 60, padding: 0 }}
	>
		<CenterWrapper>
			{children}
		</CenterWrapper>
	</Header>
)

Boiler.Content = ({ children }) => (
	<Content
		className="boiler-content"
		style={{marginBottom: 100}}
	>
			{children}
	</Content>
)

Boiler.Footer = ({ children }) => (
	<Footer style={{background: "#05379c", color: "white"}}>
		<CenterWrapper>
			{children}
		</CenterWrapper>
	</Footer>
)

export default Boiler
