import React from 'react'
import { Layout, Row, Col } from 'antd'
import 'resources/boiler.css'

const { Content, Header } = Layout

const Boiler = ({ children, theme }) => (
	<Layout className={theme}>
		{children}
	</Layout>
)

Boiler.Header = ({ children }) => (
	<Header
		style={{ position: 'fixed', zIndex: 1, width: '100%', height: 60, padding: 0 }}
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

export default Boiler
