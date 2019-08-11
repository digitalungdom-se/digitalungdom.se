import React, { useState } from 'react'
// import { Link } from '@components'
import { Button, Divider, Icon } from 'antd'
import Link from '@components/link'
import Reply from 'containers/Reply'
import Agorize from 'containers/agorize'

function Actions({ dispatch, remove, report, id, link, isAuthor, like, replied }) {

	const [isReplying, reply] = useState(false)

	return (
		<div>
			<Button
				style={{padding: 0}}
				type="link"
				onClick={e => like(id)}
			>
				Star
			</Button>
			<Divider type="vertical"/>
			<Button
				style={{padding: 0}}
				type="link"
				onClick={() => reply(!isReplying)}
			>
				Reply<Icon type="message" />
			</Button>
			{
				isAuthor &&
				<React.Fragment>
					<Divider type="vertical"/>
					<Button
						style={{padding: 0}}
						type="link"
						onClick={e => remove(id)}
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
					report(id, reason)
				}}
			>
				Report
			</Button>
			{
				(isReplying && !replied)&&
				<Agorize
					id={id}
					agoragramType="comment"
					onCancel={() => reply(false)}
				/>
			}
	</div>
	)
}

export default Actions
