import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"

const fontSize = {
	xs: 10,
	sm: 20,
	md: 40,
}

export default () => (

	<Col type="flex" justify="space-between" style={{paddingTop: 60}}>
		<Row gutter = {30} type="flex" justify="space-between" align="middle">
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
				md={{span: 10}}
			>
				<div>

					<h1 style={{fontSize: 40, marginBottom: 10, color: 'black', fontWeight: 'bold'}}>Programmering är roligt!</h1>

					<h3 style={{fontSize: 30, color: "#434343", fontWeight: 'bold'}}>Här kan du lära dig, <br/> dela med dig av och hjälpa<br/> andra med programmering. </h3>

					<p style={{fontSize: 18, marginBottom: 40, color: "#434343"}}>
						Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli medlem och ta del av vår community! 🌟
					</p>

					<Row>
						<Col span={8}>
							<Link to="register">
								<Button
								style={{ width: '90%'}}
								size="large"
								type="primary">
									Bli medlem!
								</Button>
							</Link>
						</Col>

						<Col span={8}>
							<Link to="login">
								<Button ghost size="large" style={{color: "#434343", width: '90%', border: "2px solid #cccccc"}}>
									Logga in
								</Button>
							</Link>
						</Col>

						<Col span={8}>
							<Link to="about">
								<Button ghost size="large" style={{color: "#434343",width: '90%', border: "2px solid #cccccc"}}>
									Om oss
								</Button>
							</Link>
						</Col>
					</Row>

				</div>
			</Col>
		</Row>
	</Col>
)
