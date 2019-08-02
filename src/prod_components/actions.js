import React, { useState } from 'react'
// import { Link } from '@components'
import { Button, Divider, Icon } from 'antd'
import Link from '@components/link'
import Reply from 'containers/Reply'

function Actions({ dispatch, anti_agorize, report, id, link, author, userId }) {

	const [isReplying, reply] = useState(false)

	return (
		<div>
			<Button
				style={{padding: 0}}
				type="link"
				onClick={() => reply(!isReplying)}
			>
				Reply<Icon type="message" />
			</Button>
			{
				author === userId &&
				<React.Fragment>
					<Divider type="vertical"/>
					<Button
						style={{padding: 0}}
						type="link"
						onClick={e => dispatch(anti_agorize({agoragramID: id}))}
					>
						Delete
					</Button>
				</React.Fragment>
			}
			<Divider type="vertical"/>
			<Button
				style={{padding: 0}}
				type="link"
				onClick={e => {
					const reason = prompt('Why bro?')
					dispatch(report({id, reason, place: "agoragram"}))
				}}
			>
				Report
			</Button>
			{
				isReplying &&
				<Reply
					id={id}
					onCancel={() => reply(false)}
				/>
			}
	</div>
	)
}

export default Actions
