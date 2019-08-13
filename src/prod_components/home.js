import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"


export default () => (
	<Row type="flex" justify="center" style={{flex: 1}}>
		<Row type="flex" justify="center" align="middle" style={{paddingTop: 40, paddingBottom: 40}}>
			<Col
				sm={{span: 24}}
				md={{span: 14}}
			>
				<div>
					<img src={require("resources/images/FrontPage.png")}  style={{width: "100%"}}/>
				</div>
			</Col>
			<Col
				xs={{span: 20}}
				sm={{span: 15}}
				md={{span:8}}
			>
				<div>

					<h1 style={{fontSize: 40, marginBottom: 10, color: 'black', fontWeight: 'bold'}}>Programmering är roligt!</h1>

					<h3 style={{fontSize: 32, color: "#434343", fontWeight: 'bold'}}>Här kan du lära dig, <br/> dela med dig av och hjälpa<br/> andra med programmering. </h3>

					<p style={{fontSize: 18, marginBottom: 40, color: "#434343", textAlign:"justify"}}>
						Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli medlem och ta del av vår community! 🌟
					</p>

					<Row type="flex" justify="space-between">
						<Col>
							<Link to="register">
								<Button size="large" type="primary">
									Bli medlem!
								</Button>
							</Link>
						</Col>

						<Col>
							<Link to="login">
								<Button ghost size="large" style={{color: "#434343", border: "2px solid #cccccc"}}>
									Logga in
								</Button>
							</Link>
						</Col>

						<Col>
							<Link to="about">
								<Button ghost size="large" style={{color: "#434343", border: "2px solid #cccccc"}}>
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
