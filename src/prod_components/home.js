import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter, Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"

const fontSize = {
	xs: 10,
	sm: 20,
	md: 40,
}

const CenterWrapper = ({ children }) => (
	<Row type = "flex" justify="center">
		<Col type = "flex" justify="center" span={20}>
			{children}
		</Col>
	</Row>
)

export default withTranslation() (
	withRouter(({ t, location }) => {
    return(
	<Col type="flex" justify="space-between">
		<Row style={{background: "#05379c", paddingTop: 60, paddingBottom: 50, width: "100%"}}>
			<CenterWrapper>
				<Row type="flex" justify="space-between" align="middle">
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

							<h1 style={{fontSize: 40, marginBottom: 10, color: 'white', fontWeight: 'bold'}}>Programmering är roligt!</h1>

							<h3 style={{fontSize: 30, color: "rgba(255,255,255,0.9)", fontWeight: 'bold'}}>Här kan du lära dig, <br/> dela med dig av och hjälpa<br/> andra med programmering. </h3>

							<p style={{fontSize: 18, marginBottom: 40, color: "rgba(255,255,255,0.9)"}}>
								Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli medlem och ta del av vår community! 🌟
							</p>

							<Row>
								<Col span={8}>
									<Link to={"/" + t("links-register")}>
										<Button
										style={{ width: '90%'}}
										size="large"
										type="primary">
											Bli medlem!
										</Button>
									</Link>
								</Col>

								<Col span={8}>
									<Link to={"/" + t("links-login")}>
										<Button ghost size="large" style={{color: "rgba(255,255,255,0.9)", width: '90%', border: "2px solid #cccccc"}}>
											Logga in
										</Button>
									</Link>
								</Col>

								<Col span={8}>
									<Link to={"/" + t("about")}>
										<Button ghost size="large" style={{color: "rgba(255,255,255,0.9)",width: '90%', border: "2px solid #cccccc"}}>
											Om oss
										</Button>
									</Link>
								</Col>
							</Row>

						</div>
					</Col>
				</Row>
			</CenterWrapper>
		</Row>
		<div style={{background: "#05379c", borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%", height: 20, width: "100%"}}/>

		<Row type="flex" justify="center" style={{flex: 1}}>
			<Row type="flex" justify="center" style={{paddingTop: 140, paddingBottom: 80}}>
				<Col span={8}>
					<div>
						<img src={require("resources/images/underConstruction.png")} style={{height: 330, marginTop: -50}}/>
					</div>
				</Col>

				<Col span={8}>
					<div>

						<h3 style={{fontSize: 28, color: "#434343", fontWeight: 'bold'}}>Arbete pågår!</h3>

						<p style={{fontSize: 16, marginBottom: 10, color: "#434343"}}>
							Detta är den första versionen av digitalungdom.se så det saknas forfarande många planerade funktioner.
							Vi arbetar dock hårt med hemsidan och fler funktioner kommer snart!
						</p>

						<p style={{fontSize: 16, marginBottom: 10, color: "#434343"}}>
							För tillfället kan ni njuta av Agora (vårt forum) och
							faktumet att ni kan skapa i princip vilket användarnamn som helst! 😎
						</p>

						<Row style={{marginTop: 30}}>
								<Link to={"/" + t("links-register")}>
									<Button type="primary" size="large" style={{ borderRadius: 10 }}>
										Skapa ett konto
									</Button>
								</Link>
						</Row>

					</div>
				</Col>
			</Row>
		</Row>
	</Col>
    )
  })
)
