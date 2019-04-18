import  React from 'react'

class Agorize extends React.Component {
	handleForm(e) {
		e.preventDefault()
		const { groups, group, type, title, body, tags } = e.target
		const values = {
			groups: groups.value.replace(/ /g, '').split(',').filter(Boolean),
			group: group.value,
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
					<input name="groups" type="text" placeholder="groups"/>
				</div>
				<div>
					<input name="group" type="text" placeholder="author" defaultValue="user"/>
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
