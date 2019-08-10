import React from 'react'
// import { Link } from '@components'
import Link from '@components/link'

function Actions({ like, remove, report, link }) {

	// const { asteri, anti_agorize, report } = this.props.actions
	// const { id, link } = this.props
	return (
		<div>
			<button onClick={like}>Like</button>
			<button onClick={remove}>Delete</button>
			<button onClick={() => report(prompt('Why bro?'))}>Report</button>
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

export default Actions
