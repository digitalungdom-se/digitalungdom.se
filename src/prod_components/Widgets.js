import React from 'react'
import Link from '@components/link'
import { Card } from 'antd'

function Widgets({ hypagora }) {
	return (
		<div
			style={{
				background: "white",
				border: "1px solid #e8e8e8",
				borderRadius: 4
			}}
		>
			<div
				style={{
					background: "#1051c2",
					padding: 16,
					borderTopRightRadius: 4,
					borderTopLeftRadius: 4
				}}
			>
				<h1
					style={{padding: 0, margin: 0, color: "white"}}
				>
					Agora
				</h1>
			</div>
			<div
				style={{padding: 16}}
			>
				<p>
					Agora – benämningen på av torg i antika grekiska städer. De användes som marknadsplats eller allmän mötesplats.
				</p>
				<p>
					Agora är Digital Ungdoms egna forum där medlemmar kan göra inlägg.
				</p>
				<Link linkType="button" to={"/agora/h/" + hypagora + "/publicera"} type="primary" style={{width: "100%"}}>
					Publicera inlägg
				</Link>
			</div>
		</div>
	)
}

export default Widgets
