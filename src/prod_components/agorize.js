import  React from 'react'

class Agorize extends React.Component {
	handleForm(e) {
		e.preventDefault()
		const { group, type, title, body, tags } = e.target
		const values = {
			group: group.value.replace(/ /g, '').split(','),
			type: type.value,
			title: title.value,
			body: body.value,
			tags: tags.value.replace(/ /g, '').split(','),
			badges: []
		}
		this.props.agorize(values)
	}
	render() {
		return (
			<form
				onSubmit={(e) => this.handleForm(e)}
			>
				<h1>Agorize</h1>
				<div>
					<input name="group" type="text" placeholder="group" defaultValue={this.props.subreddit} />
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
