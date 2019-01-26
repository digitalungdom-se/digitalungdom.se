import React, { Component } from 'react'
import {
  Menu, Row, Col, Button, Dropdown, Icon
} from 'antd';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import ResponsiveNav from './ResponsiveNav.js'

const MenuMarkup = ({ mobileVersion, activeLinkKey, onLinkClick, className }) => (
	<div style={{width: 225}}>
	  <Menu
	    // theme={mobileVersion ? 'light' : 'dark'}
	    mode={mobileVersion ? 'vertical' : 'horizontal'}
	    selectedKeys={[`${activeLinkKey}`]}
	    className={className}
	    style={{lineHeight: '62px'}}
	  >	
	    <Menu.Item key='/'>
	      <Link onClick={onLinkClick} to='/'>Home</Link>
	    </Menu.Item>
	    <Menu.Item key='/state'>
	      <Link onClick={onLinkClick} to='/state'>State</Link>
	    </Menu.Item>
	    <Menu.Item key='/blog'>
	      <Link onClick={onLinkClick} to='/blog'>Blog</Link>
	    </Menu.Item>
	  </Menu>
  </div>
)

class DUHeaderDOM extends Component {
	render() {
		const { location } = this.props
		const LoginAndRegister = this.props.Auth.username ? null : (
			<Col
				xs={{span: 0}}
				sm={{span: 4}}
				md={{span: 7}}
				xl={{span: 5}}
			>
				<Row
					type="flex"
					justify="space-around"
				>
					<Col
					xs={{span: 0}}
						md={{span: 12}}
						style={{textAlign: 'center'}}
					>
						<Link to="/logga-in">
							<Button>
								Logga in
							</Button>
						</Link>
					</Col>
					<Col xs={{span: 0}} sm={{span: 0}} md={{span: 12}} style={{textAlign: 'center'}}>
						<Link to="/bli-medlem">
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
					xs={{span: 0}}
					sm={{span: 6, offset: 1}}
					md={{span: 5, offset: 1}}
					lg={{span: 4}}
					style={{height: '100%', padding: '10px 0'}}
				>
					<Link to="/">
				  	<div className="logo" />
			  	</Link>
		  	</Col>
  			<Col
  				xs={{span: 7}}
  				sm={{span: 0}}
  				style={{height: '100%', padding: '10px 0'}}
  			>
  				<Link to="/">
  			  	<div className="logo-xs"/>
  		  	</Link>
  	  	</Col>
			  <Col
			  	xs={{span: 2}}
			  	sm={{span: 15}}
			  	md={{span: 11}}
			  >
			  	<ResponsiveNav 
				    menuMarkup={MenuMarkup}
				    activeLinkKey={location.pathname}
				    // mobileBreakPoint={767}
				    placement='bottom'
					/>
			  </Col>
			  {LoginAndRegister}
		  </Row>
		)
	}
}

class DUMenu extends Component {
	render() {
		return (
			<Menu
		mode="horizontal"
	  selectedKeys={[this.props.location.pathname]}
	  style={{ lineHeight: '62px', borderBottom: 'none', background: 'none' }}
	>
		<Menu.Item key="/">
			<Link to="/">Startsida</Link>
		</Menu.Item>
	  <Menu.Item key="/state">
	  	<Link to="/state">State</Link>
		</Menu.Item>
	</Menu>
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
