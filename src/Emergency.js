import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth } from './actions'
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
					<option value="nothing"></option>
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
				<div className="inline">
					<textarea style={{width: 350, height: 400}} value={this.state.value} onChange={this.handleTextAreaChange}/>
					<button
						onClick={() => this.props[this.state.selected](JSON.parse(this.state.value))}
					>
						Do action
					</button>
				</div>
				<div className="inline">
					<textarea style={{width: 350, height: 400}} onChange={() => ''} value={'PAYLOAD\n\n' + this.props.log.route + '\n' + JSON.stringify(this.props.log.payload, null, 2)}/>
				</div>
				<div className="inline">
					<textarea style={{width: 350, height: 400}} onChange={() => ''} value={'RESULT\n\n' + this.props.log.route + '\n' + JSON.stringify(this.props.log.result, null, 2)}/>
				</div>
				<div className="inline">
					<textarea style={{width: 350, height: 400}} onChange={() => ''} value={JSON.stringify(this.props.state, null, 2)}/>
				</div>
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
	return {
		login: (credentials) => dispatch(Auth.login(credentials))
		// createInstance: instance => dispatch(Instances.createInstance(instance))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Emergency)
