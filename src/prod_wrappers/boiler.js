import React from 'react'
import { Layout, Row, Col } from 'antd'
import 'resources/boiler.css'

const { Content, Header, Footer } = Layout

const Boiler = ({ children, theme }) => (
	<Layout className={theme}>
		{children}
	</Layout>
)

Boiler.Header = ({ children }) => (
	<Header
		style={{ position: 'fixed', zIndex: 2, width: '100%', height: 60, padding: 0 }}
	>
		{children}
	</Header>
)

Boiler.Content = ({ children }) => (
	<Content
		className="boiler-content"
	>
		{children}
	</Content>
)

Boiler.Footer = ({ children }) => (
	<Footer style={{backgroundColor: '#133075', paddingTop: 60, paddingBottom: 6}}>
		<Row type='flex' justify='center'>
		{children}
		</Row>
	</Footer>
)

export default Boiler
