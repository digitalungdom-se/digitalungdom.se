import React, { useState } from 'react'
// import { Link } from '@components'
import Link from '@components/link'
import Agorize from 'containers/agorize'

function Actions({
	like,
	remove,
	report,
	link,
	id,
	agoragramType,
	isAuthor,
	defaultBody,
	showReplyButton = true,
	liked = false
}) {

	const [showsField, showReplyField] = useState(false)

	return (
		<div>
			<button onClick={like}>{liked ? "Remove like" : "Like"}</button>
			{
				isAuthor &&
				<button onClick={remove}>Delete</button>
			}
			<button onClick={() => report(prompt('Why bro?'))}>Report</button>
			{
				link &&
				<Link
					to={link}
				>
					Comments
				</Link>
			}
			{
				showReplyButton  &&
					<React.Fragment>
						<button onClick={() => showReplyField(!showsField)}>
							Reply
						</button>
						{
							showsField &&
							<div>
								<Agorize
									replyTo={id}
									agoragramType={agoragramType}
									defaultBody={defaultBody}
								/>
							</div>
						}
					</React.Fragment>
			}
	</div>
	)
}

export default Actions
