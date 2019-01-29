import React, { Component } from 'react'
import { Row, Col } from 'antd'

class DUFooter extends Component {
	render() {
		const size = {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 6
			// style:{background: 'red'}
		}
		return (
			<Row
				type="flex"
				justify="center"
				gutter={20}
				style={{width: '100%', padding: 0, margin: 0}}
			>
				<Col
					{...size}
				>
					<h3>
						Om oss
					</h3>
					<p>
						Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
					</p>
				</Col>
				<Col
					{...size}
				>
					<h3>
						Kontakt
					</h3>
					<p>
						E-post: <a href="mailto:styrelse@digitalungdom.se">digitalungdom@gmail.com</a>
					</p>
					<p>
						Telefonnummer: <a href="tel:***REMOVED***">***REMOVED***</a>
					</p>
					<p>
						Discord-server: <a href="https://discord.gg/2Cankhw">https://discord.gg/2Cankhw</a>
					</p>
				</Col>
			</Row>
		)
	}
}

export default DUFooter
