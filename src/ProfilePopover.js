import React, { Component } from 'react'
import { Avatar, Button, message, Col } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ProfilePopover extends Component {

	componentDidMount() {
		const push = Date.now() - this.props.Auth.authTime < 1000 ? message.success('Du är nu inloggad') : null
	}

	render() {

		return (
			<Col
				xs={{span: 0}}
				sm={{span: 4}}
				md={{span: 7}}
				xl={{span: 5}}
				style={{textAlign: 'right', paddingRight: 20}}
			>
				<Link to="min-profil">
					<Avatar shape="square" icon="user"/>
				</Link>
			</Col>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	}
}

export default connect(mapStateToProps)(ProfilePopover)
