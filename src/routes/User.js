import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Skeleton } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Users, Auth } from 'actions'

class User extends Component {

	componentDidMount() {

		if(!this.props.Auth.username) this.props.auth()
	}

	render() {

		// if(this.props.Users.gotUser !== undefined && username !== this.props.Users.gotUser) return <Redirect to={`/u/${this.props.Users.gotUser}`} />

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
						<Avatar icon="user" size={200} style={{margin: '0 auto', display: 'block'}} />
						<div style={{margin: '0 auto', width: '90%', marginTop: 30}} >
							<h1>{this.props.Auth.name}</h1>
							<h2 style={{color: 'gray'}}>{this.props.Auth.username}</h2>
							<h3><a href={"mailto:" + this.props.Auth.email}>{this.props.Auth.email}</a></h3>
							<h4>Medlem sedan februari 2019</h4>
						</div>
					</Card>
				</Col>
			</Row>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: sup => dispatch(Auth.auth())
	}
}

const mapStateToProps = (state) => {
	return {
		Users: {
			...state.Users
		},
		Auth: {
			...state.Auth
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
