import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"


export default () => (
	<Row type="flex" justify="center" style={{flex: 1}}>
		<Row type="flex" justify="center" style={{paddingTop: 110, maxWidth: 1200}}>
			<Col span={14}>
				<div style={{height: 400, textAlign: 'center', marginRight: 30,marginLeft: -20, marginTop: -45}}>
					<img src="images/FrontPage.png" style={{height: 510, width: 700}}/>
				</div>
			</Col>

			<Col span={10}>
				<div>

					<h1 style={{fontSize: 40, marginBottom: 10, color: 'black', fontWeight: 'bold'}}>Programmering är roligt!</h1>

					<h3 style={{fontSize: 32, color: "#434343", fontWeight: 'bold'}}>Här kan du lära dig, <br/> dela med dig av och hjälpa<br/> andra med programmering. </h3>

					<p style={{fontSize: 18, marginBottom: 40, color: "#434343", textAlign:"justify"}}>
						Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli medlem och ta del av vår community! 🌟
					</p>

					<Row type="flex" justify="space-between">
						<Col>
							<Link to="register">
								<Button style={{fontSize: 18, height: 44, width: 154,  borderRadius: 10}} type="primary">
									Bli medlem!
								</Button>
							</Link>
						</Col>

						<Col>
							<Link to="login">
								<Button ghost style={{fontSize: 18, height: 44, width: 154,  borderRadius: 10, color: "#434343", border: "2px solid #cccccc"}}>
									Logga in
								</Button>
							</Link>
						</Col>

						<Col>
							<Link to="about">
								<Button ghost style={{fontSize: 18, height: 44, width: 154,  borderRadius: 10, color: "#434343", border: "2px solid #cccccc"}}>
									Mer om oss
								</Button>
							</Link>
						</Col>
					</Row>

				</div>
			</Col>
		</Row>
	</Row>
)
