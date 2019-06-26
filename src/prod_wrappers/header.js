import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'

const Logo = () => (
	<Link to="/" onClick={() => console.log("sup")}>
		<h1 className="logo">
			Digital Ungdom
		</h1>
	</Link>
)

const Header = ({ children }) => (
	<Row
		type="flex"
		justify="space-between"
		style={{height: 60}}
	>
		<Col
			xs={{span: 9, offset: 0}}
			sm={{span: 8, offset: 1}}
			md={{span: 6, offset: 1}}
			lg={{span: 4}}
			className="ant-col"
		>
			<Logo />
		</Col>
		{children}
	</Row>
)

Header.Authentication = ({ children }) => (
	<Col
		xs={{span: 9, offset: 0}}
		sm={{span: 8, offset: 1}}
		md={{span: 6, offset: 1}}
		lg={{span: 4}}
		className="ant-col"
	>
		{children}
	</Col>
)

Header.Dropdown = ({ children }) => (
	<Col
		xs={{span: 7, offset: 0}}
		sm={{span: 8, offset: 1}}
		md={{span: 6, offset: 1}}
		lg={{span: 5}}
		className="ant-col"
	>
		{children}
	</Col>
)

export default Header
