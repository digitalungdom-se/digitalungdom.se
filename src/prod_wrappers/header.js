import React from 'react'
import { Col } from 'antd'

const Header = ({ children }) => children

Header.Authentication = ({ children }) => (
	<div>
		{children}
	</div>
)

Header.Dropdown = ({ children }) => (
	<Col
		xs={{span: 20, offset: 1}}
		sm={{span: 8, offset: 1}}
		md={{span: 6, offset: 1}}
		lg={{span: 5}}
		className="ant-col"
	>
		{children}
	</Col>
)

export default Header
