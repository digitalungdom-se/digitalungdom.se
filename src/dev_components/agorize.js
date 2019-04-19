import  React from 'react'

class Agorize extends React.Component {
	handleForm(e) {
		e.preventDefault()
		const { role, hypagora, type, title, body, tags } = e.target
		const values = {
			role: role.value,
			hypagora: hypagora.value,
			type: type.value,
			title: title.value.toString(),
			body: body.value.toString(),
			tags: tags.value.replace(/ /g, '').split(',').filter(Boolean),
			badges: []
		}
		console.log(values)
		this.props.agorize(values)
	}
	render() {
		return (
			<form
				onSubmit={(e) => this.handleForm(e)}
			>
				<h1>Agorize</h1>
				<div>
					<input name="hypagora" type="text" placeholder="hypagora" defaultValue={this.props.hypagora}/>
				</div>
				<div>
					<input name="role" type="text" placeholder="role" defaultValue="user"/>
				</div>
				<div>
					<select name="type">
						<option value="text">text</option>
						<option value="link">link</option>
						<option value="question">question</option>
					</select>
				</div>
				<div>
					<input name="title" type="text" placeholder="title" />
				</div>
				<div>
					<textarea name="body" placeholder="body"/>
				</div>
				<div>
					<input name="tags" type="text" placeholder="tags" />
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default Agorize
