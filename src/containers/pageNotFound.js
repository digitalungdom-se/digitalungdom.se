import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"


export default () => (
	<Row type="flex" justify="center" style={{flex: 1}}>
		<Row type="flex" justify="center" style={{paddingTop: 160, maxWidth: 1200}}>

      <Col>
        <div>
          <img src="images/Whoops.png" style={{height: 330, marginTop: -50}}/>
        </div>
      </Col>

      <Col span={8}>
        <div>

          <h3 style={{fontSize: 28, color: "#434343", fontWeight: 'bold'}}>Oops! 404!</h3>

          <p style={{fontSize: 18, marginBottom: 10, color: "#434343", textAlign:"justify"}}>
            Sidan du letar efter verkar tyvärr inte finnas, försök igen!
          </p>
          <p style={{fontSize: 15, marginBottom: 30, color: "#919191", textAlign:"justify"}}>
             404-errorn är en felkod som i HTTP-protokollet betecknar att webbsidan som efterfrågats inte finns eller inte kan hittas.
          </p>

          <Row type="flex" justify="space-between">
              <Link to="about">
                <Button type="primary" style={{ borderRadius: 10 }}>
                  Tillbaka till landningssidan
                </Button>
              </Link>
          </Row>

        </div>
      </Col>
		</Row>
	</Row>
)
