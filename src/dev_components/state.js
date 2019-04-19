import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import './style.css'

class State extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			select: Object.keys(this.props.state.State)[0] ? Object.keys(this.props.state.State)[0] : "",
			payload: Object.keys(this.props.state.State)[0] ? this.props.state.State[Object.keys(this.props.state.State)[0]].template : "Data"
		}
	}

	onChange(e){
		const newState = {
			[e.target.name]: e.target.value,
		}
		if(e.target.name === "select") newState.payload = this.props.state.State[e.target.value].template
			console.log()
    this.setState(newState)
	}

	create(e) {
		e.preventDefault()
		const { name, template, method, route } = e.target
		let value = JSON.stringify(JSON.parse(template.value), null, 2)
		this.props.addFunction(name.value, method.value, route.value, value)
	}
	remove() {
		this.props.removeFunction(this.state.select)
	}

	doAsync() {
		const f = this.props.state.State[this.state.select]
		this.props.doFunction(f.method, f.route, JSON.parse(this.state.payload))
	}

	render() {
		const { state } = this.props
		const style = {
			padding: 0, margin: 0, width: window.innerWidth/4 - 2, height: 400
		}
		const functions = Object.keys(state.State)
		let inner
		if(this.props.match.params.create) {
			inner = (
				<form
					onSubmit={e => this.create(e)}
				>
					<div>
						<input type="text" name="name" placeholder="name"/>
					</div>
					<div>
						<input type="text" name="method" placeholder="GET"/>
					</div>
					<div>
						<input type="text" name="route" defaultValue="/api/" placeholder="/api/route" />
					</div>
					<div>
						<textarea name="template" placeholder="template" style={{width: 400, height: 400}} />
					</div>
					<button type="submit">Create</button>
				</form>
			)
		} else inner = (
			<div>
				<div>
					<select
						name="select"
						onChange={this.onChange.bind(this)}
					>
						<option disabled defaultValue>Select function</option>
						{
							functions.map(f => <option key={f} value={f}>{f}</option>)
						}
					</select>
				</div>
				<textarea
					name="payload"
					onChange={this.onChange.bind(this)}
					value={this.state.payload} placeholder="" style={style}
				/>
				<textarea readOnly value={`Payload\n${JSON.stringify(state.Log.payload, null, 2)}`} placeholder="" style={style} />
				<textarea readOnly value={`Response\n${JSON.stringify(state.Log.response, null, 2)}`} placeholder="" style={style} />
				<textarea readOnly value={JSON.stringify(state, null, 2)} placeholder="" style={style} />
				<button onClick={() => this.doAsync()}>Do api call</button>
				<button onClick={() => this.remove()}>Remove function</button>
			</div>
		)
		return (
			<div>
				<h1>State</h1>
				{inner}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	state
})

const mapDispatchToProps = dispatch => ({
	addFunction: (name, method, route, template) => dispatch(actions.State.addFunction(name, method, route, template)),
	removeFunction: (name) => dispatch(actions.State.removeFunction(name)),
	doFunction: (method, route, payload) => dispatch(actions.State.do_function(payload, null, {method, route}))
})

export default connect(mapStateToProps, mapDispatchToProps)(State)
