import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Login, Register } from '../../actions'
import { Row, Col } from 'antd'
import EmergencyActions from './EmergencyActions'
import './EmergencyActions.css'

class Emergency extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 'nothing',
			value: ''
		}
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
	}

	select(e) {
		var options = e.target.options
		for(var i = 0; i < options.length; i++) {
			if(options[i].selected) this.setState({
				selected: options[i].value,
				value: JSON.stringify(EmergencyActions[options[i].value], null, 2)
			})
		}
	}

	handleTextAreaChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
			<div>
				<select style={{display: 'block'}} onChange={e => this.select(e)}>
					<option value="nothing" ></option>
					{Object.keys(EmergencyActions).map((action, id) => (
						<option
							key={id}
							value={action}
						>
							{action}
						</option>
					))
				}
				</select>
				<Row>
					<Col span={6}>
						<textarea style={{width: '100%', height: 400}} value={this.state.value} onChange={this.handleTextAreaChange}/>
						<button
							onClick={() => this.props[this.state.selected](JSON.parse(this.state.value))}
						>
							Do action
						</button>
					</Col>
					<Col span={6}>
						<textarea style={{width: '100%', height: 400}} onChange={() => ''} value={'PAYLOAD\n\n' + this.props.log.route + '\n' + JSON.stringify(this.props.log.payload, null, 2)}/>
					</Col>
					<Col span={6}>
						<textarea style={{width: '100%', height: 400}} onChange={() => ''} value={'RESPONSE\n\n' + this.props.log.route + '\n' + JSON.stringify(this.props.log.response, null, 2)}/>
					</Col>
					<Col span={6}>
						<textarea style={{width: '100%', height: 400}} onChange={() => ''} value={JSON.stringify(this.props.state, null, 2)}/>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let object = Object.assign({}, state)
	delete object.Log
	return {
		state: object,
		log: state.Log
	}
}

const mapDispatchToProps = (dispatch) => {
	// let reducers = {}
	// Object.keys(EmergencyActions).map((category, i) => {
	// 	reducers[category] = {}
	// 	Object.keys(category).forEach(reducer => reducers[category][reducer] = dispatch())
	// })
	return {
		login: (credentials) => dispatch(Login.login(credentials)),
		register: (credentials) => dispatch(Register.register(credentials)),
		check_username: username => dispatch(Register.check_username(username)),
		check_email: email => dispatch(Register.check_email(email)),
		postBlog: t => console.log(t),
		// createInstance: instance => dispatch(Instances.createInstance(instance))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Emergency)
