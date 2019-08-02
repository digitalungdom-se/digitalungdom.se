import React from 'react'
import { Col, Row, Icon, Dropdown, List, Avatar } from 'antd'
import './Icons.css'

function Icons() {
	return (
		<Row
			style={{fontSize: 24, height: "100%"}}
			type="flex"
			align="middle"
		>
			<Dropdown
				trigger={['click']}
				placement="bottomCenter"
				overlay={
					<div
						style={{background: "#fff"}}
					>
					</div>
 				}
 				>
				<Icon
					type="bell"
					theme="filled"
					className="notification-bell"
				/>
			  </Dropdown>
		</Row>
	)
}

export default Icons
