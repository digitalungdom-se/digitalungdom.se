import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Skeleton } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Users} from './actions'

class User extends Component {

	componentDidMount() {
		const username = this.props.match.params.username

		if(this.props.Users[username] === undefined) {
			this.props.getUser(username)
		}

	}

	render() {

		const username = this.props.match.params.username

		if(this.props.Users.gotUser !== undefined && username !== this.props.Users.gotUser) return <Redirect to={`/u/${this.props.Users.gotUser}`} />

		return (
			<Row
				justify="center"
				type="flex"
			>
				<Col
					style={{marginTop: 40}}

					xs= {{
            span: 18,
          }}
          sm={{
            span: 15
          }}
          md={{
            span: 12
          }}
          lg={{
            span: 7
          }}
				>
					<Card>
						<Skeleton loading={this.props.Users[this.props.Users.gotUser] === undefined} active avatar>
							<Avatar icon="user" size={200} style={{margin: '0 auto', display: 'block'}} />
							<div style={{margin: '0 auto', width: '90%', marginTop: 30}} >
								<h1>{this.props.Users[username] ? this.props.Users[username].name : null}</h1>
								<h2 style={{color: 'gray'}}>{username}</h2>
								<h4>Medlem sedan februari 2019</h4>
							</div>
						</Skeleton>
					</Card>
				</Col>
			</Row>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUser: username => dispatch(Users.get_user({username}))
	}
}

const mapStateToProps = (state) => {
	return {
		Users: {
			...state.Users
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
