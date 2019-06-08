import React from 'react'
import { Link } from '@components'

class Actions extends React.Component {
	render() {
		const { asteri, anti_agorize, report } = this.props.actions
		const { id, link } = this.props
		return (
			<div>
				<button onClick={e => asteri({agoragramID: id})}>Asteri</button>
				<button onClick={e => anti_agorize({agoragramID: id})}>anti_agorize</button>
				<button onClick={e => {
					const reason = prompt('Why bro?')
					report({id, reason, place: "agoragram"})
				}}>Report</button>
				{
					link &&
					<Link
						to={link}
					>
						Comments
					</Link>
				}
		</div>
		)
	}
}

export default Actions
