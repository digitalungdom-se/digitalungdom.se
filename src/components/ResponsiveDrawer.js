import React, { Component } from 'react'
import { Button, Col, Drawer, Menu, Row, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { AuthButtons } from 'components'

const { SubMenu } = Menu

const MenuMarkup = ({ mobileVersion, activeLinkKey, onLinkClick, className }) => (
  <Menu
    mode={mobileVersion ? 'inline' : 'horizontal'}
    selectedKeys={[`${activeLinkKey}`]}
    // className={className}
    style={{lineHeight: '62px'}}
  >	
    <Menu.Item key='/'>
      <Link onClick={onLinkClick} to='/'>Startsida</Link>
    </Menu.Item>
    <Menu.Item key='/om-oss'>
      <Link onClick={onLinkClick} to='/om-oss'>Om oss</Link>
    </Menu.Item>
    <Menu.Item key='/verksamhet'>
      <Link onClick={onLinkClick} to='/verksamhet'>Verksamhet</Link>
    </Menu.Item>
  </Menu>
)

class ResponsiveDrawer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			viewportWidth: 0,
		}
	}

	componentDidMount() {
	  // update viewportWidth on initial load
	  this.saveViewportDimensions();
	  // update viewportWidth whenever the viewport is resized
	  window.addEventListener('resize', this.saveViewportDimensions);
	}

	componentWillUnmount() {
	  // clean up - remove the listener before unmounting the component
	  window.removeEventListener('resize', this.saveViewportDimensions);
	}
	
	// first of all notice lodash.throttle() helper
	// we do not want to run the saveViewportDimensions() hundreads of times
	// from start to finish whenever the viewport is being resized
	saveViewportDimensions = throttle(() => {
	  this.setState({
	    viewportWidth: window.innerWidth,
	  })
	}, this.props.applyViewportChange); // default 250ms

	onClick = () => {
		this.setState({visible: true})
	}

	onClose = () => {
		this.setState({visible: false})
	}

	render() {

		if (this.state.viewportWidth > this.props.mobileBreakPoint) {
		  // viewportWidth is over the mobileBreakpoint - render menu as is 
		  // <MenuMarkup activeLinkKey={this.props.activeLinkKey} />;
		  return (
		  	<Col
					xs={{span: 3 }}
					sm={{span: 15 }}
					md={{span: 17 }}
					lg={{span: 19 }}
	  		>
	  			<Col
	  				sm={{span: 18}}
	  				md={{span: 14}}
	  				lg={{span: 18}}
  				>
		  			<MenuMarkup
		  				activeLinkKey={this.props.activeLinkKey}
		  			/>
	  			</Col>
	  			<Col
	  				sm={{span: 6}}
	  				md={{span: 10}}
	  				lg={{span: 6}}
  				>
	  				<AuthButtons />
	  			</Col>
	  		</Col>
		  )
		}

		return (
			<Col
				xs={{span: 3 }}
				sm={{span: 15 }}
				md={{span: 17 }}
				lg={{span: 19 }}
				style={{textAlign: 'right', paddingRight: 20}}
			>
				<Button
					onClick={this.onClick}
				>
					<Icon type="menu"/>
				</Button>
				<Drawer
					visible={this.state.visible}
					onClose={this.onClose}
					className="menu-drawer"
				>
					<AuthButtons mobile={true} onClick={this.onClose} />
					<Menu
						selectedKeys={[this.props.activeLinkKey]}
				    onClick={this.handleClick}
				    style={{ width: 255 }}
				    mode="inline"
				  >
				  	<Menu.Divider />
				    <Menu.Item key='/'>
				      <Link onClick={this.onClose} to='/'>Startsida</Link>
				    </Menu.Item>
				    <Menu.Item key='/om-oss'>
				      <Link onClick={this.onClose} to='/om-oss'>Om oss</Link>
				    </Menu.Item>
				    <Menu.Item key='/verksamhet'>
				      <Link onClick={this.onClose} to='/verksamhet'>Verksamhet</Link>
				    </Menu.Item>
				  </Menu>
				</Drawer>
			</Col>
		)
	}
}

ResponsiveDrawer.propTypes = {
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  activeLinkKey: PropTypes.string,
  placement: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
}

ResponsiveDrawer.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
  placement: 'bottom',
}

export default ResponsiveDrawer
