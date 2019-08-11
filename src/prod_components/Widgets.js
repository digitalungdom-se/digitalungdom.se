import React from 'react'
import Link from '@components/link'
import { Card } from 'antd'

function Widgets({ hypagora }) {
	return (
		<Card>
			<h1>Agora</h1>
			<p>Agora är ett forum.</p>
			<Link linkType="button" to={"/agora/h/" + hypagora + "/publicera"} type="primary">
				Publicera inlägg
			</Link>
		</Card>
	)
}

export default Widgets
