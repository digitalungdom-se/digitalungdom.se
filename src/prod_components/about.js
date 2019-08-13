import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Icon } from 'antd'

/*
<Row type="flex" justify="center" style={{paddingTop: 80}}>

  <Col span={11}>
    <div style={{paddingRight: 50}}>

      <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold'}}>Vår story</h3>

      <p style={{fontSize: 15, marginBottom: 40, color: "#434343", textAlign:"justify"}}>
      Digital Ungdom har startat på initiativ från Douglas Bengtsson som är förbundsstyrelsens ordförande.
      Douglas har länge inspirerats av det nationella förbundet Astronomisk Ungdom, och har saknat en
      motsvarighet för teknik- och programmeringsintresserade ungdomar. Sommaren 2018 deltog Douglas
      i den svenska sommarforskarskolan Rays, där han fick träffa andra likasinnade och engagerade ungdomar.
      Under Rays träffade han bland andra de två engagerade eleverna Simon Sondén och Kelvin Szolnoky.
      Simon Sondén som är vice ordförande i styrelsen bor i Umeå och har bland annat deltagit i Robocup
      Junior VM. Kelvin Szolnoky som är vice ordförande i styrelsen bor i Göteborg och har bland annat
      varit mycket aktiv inom Astronomisk Ungdoms verksamhet.
      </p>

    </div>
  </Col>

  <Col span={13}>
    <div style={{ backgroundColor: 'pink', position: 'relative', height: 400, textAlign: 'center', paddingTop: 160}}>
      <h1>Mer bilder här på teamet kanske</h1>
    </div>
  </Col>

</Row>
*/

const profile = (name, surname, bio, role, color) => (
  <Col
    xs={{span: 24}}
    md={{span: 4}}
  >
    <div style={{ margin: 'auto', textAlign: 'center', width: "100%", maxWidth: 400, padding: "0 24px"}}>
      <div style={{ margin: "0 auto", borderRadius: 10, backgroundColor: color }}>
        <img src={require("resources/images/portraits/" + name.toLowerCase() + ".png")} style={{width: "100%", borderRadius: 10}}/>
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

  <Row type="flex" justify="center"  style={{flex: 1}}>
  	<Row type="flex" justify="center">
  		<Row type="flex" justify="center" style={{paddingTop: 90}}>
  			<Col
          sm={{span: 24}}
          md={{span: 12}}
        >
          <div>
  					<img src={require("resources/images/about1.png")}  style={{width: "100%"}}/>
  				</div>
  			</Col>
  			<Col
          xs={{span: 20}}
          md={{span: 9}}
        >
  				<div>
            <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold'}}>Vad är Digital Ungdom? 🤔</h3>
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
      <Row type="flex" justify="center" style={{paddingTop: 80, width: '100%'}}>
        <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold'}}>Förbundsstyrelsen 😍</h3>
      </Row>
      {
        profile(
          "Charles",
          "Maddock",
          "Hej! Mitt namn är Charles, jag är 19 år och ansvarar mest för design här på digitalungdom.se! Det är även jag som har ritat bilderna som ni ser på hemsidan.",
          "Styrelseledamot",
          "lightGreen"
        )
      }
      {
        profile(
          "Douglas",
          "Bengtsson",
          "Tjena! Jag heter Douglas Bengtsson och är 19 år gammal. Som ordförande och grundare av Digital Ungdom är jag ansiktet utåt – men jobbar också med front-end.",
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
          "#f5222d"
        )
      }
    </Row>
	</Row>
)
