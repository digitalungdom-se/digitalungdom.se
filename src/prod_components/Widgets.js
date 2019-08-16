import React from 'react'
import Link from '@components/link'
import { Card, Col } from 'antd'

const hypagoraColor = "#1051c2"

function Widgets({ hypagora }) {
	return (
		<Col
			style={{
				background: "white",
				border:'1px solid rgba(0,0,0,0.1)',
				borderRadius: 8,
			}}
		>
			<div
				style={{
					background: hypagoraColor,
					padding: 10,
					borderTopRightRadius: 8,
					borderTopLeftRadius: 8,
					textAlign: 'center',
				}}
			>
				<h1
					style={{padding: 0, margin: 0, color: "white", fontWeight: 'bold', fontSize: 24, letterSpacing: 1}}
				>
					Agora
				</h1>
			</div>
			<div
				style={{padding: 16, paddingLeft: 20, paddingRight: 20, marginBottom: 10}}
			>
				<p>
					<b>Agora</b> – benämningen på av torg i antika grekiska städer. De användes som marknadsplats eller allmän mötesplats.
				</p>
				<p>
					Agora är Digital Ungdoms egna forum där medlemmar kan göra inlägg.
				</p>
				<Link linkType="button" to={"/agora/h/" + hypagora + "/publicera"} type="primary"  style={{width: "100%", backgroundColor: hypagoraColor }}>
					Publicera inlägg
				</Link>
			</div>
		</Col>
	)
}

export default Widgets
