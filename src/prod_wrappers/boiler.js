import React from 'react'
import { Layout, Button } from 'antd'


const boiler = ({ children }) => (
	<Layout>
		<Button />
		{children}
	</Layout>
)

boiler.Header = ({ children }) => (
	<div>
		hello
		{children}
	</div>
)

export default boiler
