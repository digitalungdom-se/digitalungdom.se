import React, { Component } from 'react'
import { Popover, Button, message } from 'antd'
import { connect } from 'react-redux'

class ProfilePopover extends Component {
	render() {
		return (
				<Popover content={<div>Sup</div>} trigger="click" placement="bottom">
				{Date.now() - this.props.Auth.authTime < 1000 && message.success('Du är nu inloggad') }
				  <Button>Hello</Button>
				</Popover>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	}
}

export default connect(mapStateToProps)(ProfilePopover)
