import React, { Component } from 'react'
import {
  Menu, Row, Col, Button
} from 'antd';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'

class DUHeaderDOM extends Component {
	render() {
		const { location } = this.props
		const LoginAndRegister = this.props.Auth.username ? null : (
			<Col
				md={{span: 4}}
			>
				<Row
					type="flex"
					justify="space-around"
				>
					<Col>
						<Link to="/loggain">
							<Button>
								Logga in
							</Button>
						</Link>
					</Col>
					<Col>
						<Link to="/blimedlem">
							<Button type="primary">
								Bli medlem
							</Button>
						</Link>
					</Col>
				</Row>
			</Col>
		)

		return (
			<Row
				style={{height: '100%'}}
				type="flex"
				justify="space-between"
			>
				<Col
					xs={{span: 12}}
					md={{span: 8}}
					style={{height: '100%', padding: 10}}
				>
					<Link to="/">
				  	<div className="logo" />
			  	</Link>
		  	</Col>
			  <Col
			  	xs={{span: 4}}
			  	md={{span: 12}}
			  >
			  	<Menu
			    	mode="horizontal"
				    defaultSelectedKeys={[location.pathname]}
				    style={{ lineHeight: '62px', borderBottom: 'none', background: 'none' }}
				  >
				  	<Menu.Item key="/">
				  		<Link to="/">Startsida</Link>
				  	</Menu.Item>
				    <Menu.Item key="/state">
				    	<Link to="/state">State</Link>
			    	</Menu.Item>
				    <Menu.Item key="3">nav 3</Menu.Item>
				  </Menu>
			  </Col>
			  {LoginAndRegister}
		  </Row>
		)
	}
}

const DUHeader = withRouter(DUHeaderDOM);

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	}
}

export default connect(mapStateToProps)(DUHeader)

// export default DUHeader
