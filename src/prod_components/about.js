import React from 'react'
import { Col, Row, Icon } from 'antd'

const CenterWrapper = ({ children }) => (
	<Row type = "flex" justify="center">
		<Col type = "flex" justify="center" span={20}>
			{children}
		</Col>
	</Row>
)

const profile = (name, surname, bio, role, color) => (
  <Col
    xs={{span: 24}}
    md={{span: 6}}
  >
    <div style={{ margin: 'auto', textAlign: 'center', width: "100%", maxWidth: 400, padding: "0 24px"}}>
      <div style={{ margin: "0 auto", borderRadius: 10, backgroundColor: color }}>
        <img src={require("resources/images/portraits/" + name.toLowerCase() + ".png")} alt="" style={{width: "100%", borderRadius: 10}}/>
      </div>
      <h4 style={{fontSize: 20, color: "#434343", fontWeight: 'bold', marginBottom: 2, marginTop: 10}}>
        {name + " " + surname}
      </h4>
      <h4 style={{fontSize: 16, color: "#434343", fontStyle: "italic",  marginBottom: 16}}>
        {role}
      </h4>
      <p style={{fontSize: 14, color: "#434343", marginBottom: 6, textAlign: "left"}}>
        {bio}
      </p>

      <p style={{fontSize: 12, color: "#707070", textAlign:"justify" }}>
        <a href={"mailto:" + name.toLowerCase() + "@digitalungdom.se"}><Icon type='mail' style={{marginRight: 8}}/> {name.toLowerCase()}@digitalungdom.se</a>
      </p>
    </div>
  </Col>
)

export default () => (

  <div>
    <Row style={{backgroundColor: 'white'}}>
      <CenterWrapper>

        <Row type="flex" justify="center" style={{paddingTop: 40, width: '100%'}}>
          <h3 style={{fontSize: 44, color: "#434343", fontWeight: 'bold', marginBottom: 30}}>Om oss</h3>
        </Row>

      	<Row type="flex" align="middle" justify="space-between" style={{paddingTop: 20, paddingBottom: 60}}>
      		<Col
            sm={{span: 24}}
            md={{span: 14}}
          >
            <div>
      				<img src={require("resources/images/about1.png")} alt="" style={{width: "100%"}}/>
      			</div>
      		</Col>

      		<Col
            xs={{span: 20}}
            md={{span: 9}}
          >
      			<div>
              <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold'}}>Vad är Digital Ungdom? <span role="img" aria-label="hmm">🤔</span></h3>
              <p style={{fontSize: 15, marginBottom: 40, color: "#434343", textAlign:"justify"}}>
              Digital Ungdom är ett nationellt allmännyttigt ideellt förbund i Sverige. Digital Ungdoms
              syfte är att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om
              digital teknik och datavetenskap, samt hur detta kan användas. Digital Ungdoms vision
              är att verka genom ett brett kontaktnät av ungdomar och därigenom aktivt bidra till att
              Sverige blir världsledande inom digital teknik och datavetenskap.
              </p>
              <p style={{fontSize: 15, marginBottom: 40, color: "#434343", textAlign:"justify"}}>
              Digital Ungdom samarbetar med den nationella handlingsplanen för digitalisering av skolväsendet.
              Sveriges Kommuner och Landsting har efter en överrenskommelse med regeringen, ansvaret att ta fram
              denna handlingsplan. Digital Ungdom bidrar med ett elevperspektiv i frågor som rör digital kompetens,
               digitaliserings utveckling, och de förslag som kommer läggas fram till regeringen i samband med handlingsplanen.
              </p>
      			</div>
      		</Col>
      	</Row>
      </CenterWrapper>
    </Row>

    <CenterWrapper>

      <Row type="flex" justify="center" style={{paddingTop: 80, width: '100%'}}>
        <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold', marginBottom: 30}}>Förbundsstyrelsen <span role="img" aria-label="heart-eyes">😍</span></h3>
      </Row>
      {
        profile(
          "Douglas",
          "Bengtsson",
          "Tjena! Jag är 20 år gammal och studerar datateknik på KTH! Som ordförande och grundare av Digital Ungdom är jag ansiktet utåt – men jobbar också med front-end.",
          "Ordförande",
          "#1e6ee8"
        )
      }
      {
        profile(
          "Kelvin",
          "Szolnoky",
          "Hej! Jag heter Kelvin Szolnoky och jobbar framförallt med Digital Ungdoms back-end men självfallet även med andra styrelseuppgifter.",
          "Vice ordförande",
          "#13c2c2"
        )
      }
      {
        profile(
          "Simon",
          "Sondén",
          "Hej! Jag heter Simon Sondén och jobbar bland annat med arkitekturen och algoritmerna bakom våra projekt. För övrigt älskar jag att bygga robotar.",
          "Vice ordförande",
          "#bf3728"
        )
      }
      {
        profile(
          "Charles",
          "Maddock",
          "Hej! Mitt namn är Charles och jag ansvarar mest för design här på digitalungdom.se! Det är även jag som har ritat bilderna som ni ser på hemsidan.",
          "Styrelseledamot",
          "lightGreen"
        )
      }
    </CenterWrapper>
  </div>
)

/*
      Digital Ungdom har startat på initiativ från Douglas Bengtsson som är förbundsstyrelsens ordförande.
      Douglas har länge inspirerats av det nationella förbundet Astronomisk Ungdom, och har saknat en
      motsvarighet för teknik- och programmeringsintresserade ungdomar. Sommaren 2018 deltog Douglas
      i den svenska sommarforskarskolan Rays, där han fick träffa andra likasinnade och engagerade ungdomar.
      Under Rays träffade han bland andra de två engagerade eleverna Simon Sondén och Kelvin Szolnoky.
      Simon Sondén som är vice ordförande i styrelsen bor i Umeå och har bland annat deltagit i Robocup
      Junior VM. Kelvin Szolnoky som är vice ordförande i styrelsen bor i Göteborg och har bland annat
      varit mycket aktiv inom Astronomisk Ungdoms verksamhet.
*/
