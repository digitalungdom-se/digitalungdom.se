import React from 'react'
// import { timeToHex } from 'utils'
import { timeToHex } from 'utils/time'

class Filter extends React.Component {

	render() {

		const { translations } = this.props
		const { sort, date } = this.props.defaultValue
		let { after, before } = date

		return (
			<div>
				<div>
					Sort
					<select
						defaultValue={sort}
						onChange={(e) => this.props.onChange({sort: e.target.value, date})}
					>
						<option value="new">{translations["New"]}</option>
						<option value="top">{translations["Top"]}</option>
					</select>
				</div>
				<form onSubmit={(e) => {
					e.preventDefault()
					if(e.target.after.value) after = {
						...timeToHex(e.target.after.value),
						chosen: true
					}
					if(e.target.before.value) before = {
						...timeToHex(e.target.before.value),
						chosen: true
					}
					this.props.onChange({ sort, date: { after, before }})
				}}>
					<input type="date" name="after" placeholder={date.after.date} />
					<input type="date" name="before" placeholder={date.before.date} />
					<button type="submit">
						Change time
					</button>
				</form>
			</div>
		)
	}
}

export default Filter
