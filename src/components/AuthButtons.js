import React from 'react'
import { Avatar, Col, Button, Row, message } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Auth as actions } from 'actions'

class AuthButtons extends React.Component {

	componentWillMount() {
		this.props.auth()
	}

	componentDidUpdate() {
		if(this.props.Auth.username && Date.now() - this.props.Auth.authTime < 1000) message.success('Du är nu inloggad')
	}

	render() {

		if(!this.props.Auth.username) {
			return (
				<Row
					type="flex"
					justify="space-around"
					style={{textAlign: 'center', minHeight: 63, lineHeight: '63px'}}
				>
					<Col
						sm={0}
						md={{span: 12}}
					>
						<Link to="/logga-in">
							<Button onClick={this.props.onClick} >
								Logga in
							</Button>
						</Link>
					</Col>
					<Col
						sm={24}
						md={{span: 12}}
					>
						<Link to="/bli-medlem">
							<Button  onClick={this.props.onClick} type="primary">
								Bli medlem
							</Button>
						</Link>
					</Col>
				</Row>
			)
		}
		else {
			const AvatarElement = this.props.mobile ? (
				<Link to="min-profil">
					{  }
					<Avatar size={100} shape="square" icon="user"/>
					<h2>{this.props.Auth.name}</h2>
					<h3>{this.props.Auth.username}</h3>
				</Link>
			) : (
				<Link to="min-profil">
					<Avatar shape="square" icon="user"/>
				</Link>
			)

			return (
				<Row
					type="flex"
					justify={this.props.mobile ? 'center' : 'end'}
					style={{textAlign: 'center', padding: this.props.mobile ? '0 0 30px 0' : '0 20px 0 0'}}
				>
					{AvatarElement}
				</Row>
			)
		}
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: () => dispatch(actions.auth())
	}
}

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtons)
