import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Icon } from 'antd'

export default () => (

  <Row type="flex" justify="center"  style={{flex: 1}}>
  	<Row type="flex" justify="center" style={{maxWidth: 1100 }}>

  		<Row type="flex" justify="center" style={{paddingTop: 80}}>

  			<Col span={13}>
  				<div style={{ backgroundColor: 'pink', position: 'relative', height: 400, textAlign: 'center', paddingTop: 160, marginRight: 30}}>
  					<h1>Folk som hjälper varandra med programmering här</h1>
  				</div>
  			</Col>

  			<Col span={11}>
  				<div style={{paddingRight: 50}}>

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

      <Row type="flex" justify="center" style={{paddingTop: 80, width: '100%'}}>
        <h3 style={{fontSize: 24, color: "#434343", fontWeight: 'bold'}}>Teamet 😍</h3>
      </Row>

      <Row type="flex" justify="space-between" style={{paddingTop: 20, width: '100%', marginBottom: 80}}>

        <Col>
          <div style={{ margin: 'auto', textAlign: 'center', width: 260}}>
            <div style={{ display: 'inline-block', position: 'relative', borderRadius: 10, height: 260, width: 260, backgroundColor: 'lightGreen' }}>
              <img src="/public/Images/Portraits/Charles.png"/>
            </div>
            <h4 style={{fontSize: 20, color: "#434343", fontWeight: 'bold', marginBottom: 2, marginTop: 10}}>
              Charles Maddock
            </h4>
            <h4 style={{fontSize: 16, color: "#434343", fontStyle: "italic",  marginBottom: 16}}>
              Styrelsemedlem
            </h4>
            <p style={{fontSize: 14, color: "#434343", marginBottom: 6, textAlign:"justify"}}>
                Hej! Mitt namn är Charles, jag är 19 år och ansvarar mest för design här på digitalungdom.se!
                Så ifall ni ser något riktigt fult är det nog mitt fel hehehe...
            </p>

            <p style={{fontSize: 12, color: "#707070", textAlign:"justify" }}>
              <Icon type='mail'/> Charles@digitalungdom.se
            </p>
          </div>
        </Col>
        <Col>
          <div style={{ margin: 'auto', textAlign: 'center', width: 260}}>
            <div style={{ display: 'inline-block', borderRadius: 10, height: 260, width: 260, backgroundColor: 'orange' }}>

            </div>
            <h4 style={{fontSize: 20, color: "#434343", fontWeight: 'bold', marginBottom: 2, marginTop: 10}}>
              Douglas Bengtsson
            </h4>
            <h4 style={{fontSize: 16, color: "#434343", fontStyle: "italic",  marginBottom: 16}}>
              Ordförande
            </h4>
            <p style={{fontSize: 14, color: "#434343", marginBottom: 6, textAlign:"justify"}}>

            </p>

            <p style={{fontSize: 12, color: "#707070", textAlign:"justify"}}>
              <Icon type='mail'/> Douglas@digitalungdom.se
            </p>
          </div>
        </Col>
        <Col>
          <div style={{ margin: 'auto', textAlign: 'center', width: 260}}>
            <div style={{ display: 'inline-block', borderRadius: 10, height: 260, width: 260, backgroundColor: 'lightPink' }}>

            </div>
            <h4 style={{fontSize: 20, color: "#434343", fontWeight: 'bold', marginBottom: 2, marginTop: 10}}>
              Kelvin Szolnoky
            </h4>
            <h4 style={{fontSize: 16, color: "#434343", fontStyle: "italic",  marginBottom: 16}}>
              Styrelsemedlem
            </h4>
            <p style={{fontSize: 14, color: "#434343", marginBottom: 6, textAlign:"justify"}}>

            </p>

            <p style={{fontSize: 12, color: "#707070", textAlign:"justify"}}>
              <Icon type='mail'/> Kelvin@digitalungdom.se
            </p>
          </div>
        </Col>
        <Col>
          <div style={{ margin: 'auto', textAlign: 'center', width: 260}}>
            <div style={{ display: 'inline-block', borderRadius: 10, height: 260, width: 260, backgroundColor: 'lightBlue' }}>

            </div>
            <h4 style={{fontSize: 20, color: "#434343", fontWeight: 'bold', marginBottom: 2, marginTop: 10}}>
              Simon Sondén
            </h4>
            <h4 style={{fontSize: 16, color: "#434343", fontStyle: "italic",  marginBottom: 16}}>
              Styrelsemedlem
            </h4>
            <p style={{fontSize: 14, color: "#434343", marginBottom: 6, textAlign:"justify"}}>

            </p>

            <p style={{fontSize: 12, color: "#707070", textAlign:"justify"}}>
              <Icon type='mail'/> Simon@digitalungdom.se
            </p>
          </div>
        </Col>

      </Row>
    </Row>
	</Row>
)
