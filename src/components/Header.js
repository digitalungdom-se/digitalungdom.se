import React, { Component } from 'react'
import { Menu, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AuthButtons, ResponsiveDrawer, ResponsiveNav, ProfilePopover } from 'components'

class Header extends Component {
	render() {

		const { location } = this.props

		return (
			<Row
				style={{ position: 'fixed', zIndex: 3, width: '100%', height: 64 }}
				type="flex"
				justify="space-between"
				className="main-header"
			>
				<Col
					xs={{span: 20, offset: 1}}
					sm={{span: 8, offset: 1}}
					md={{span: 6, offset: 1}}
					lg={{span: 4}}
				>
					<Link to="/">
				  	<h1
				  		className="logo"
				  	>
				  		Digital Ungdom
				  	</h1>
			  	</Link>
		  	</Col>
			  <ResponsiveDrawer
			  	activeLinkKey={location.pathname}
			  	mobileBreakPoint={660}
			  />
		  </Row>
		)
	}
}

export default withRouter(Header)
