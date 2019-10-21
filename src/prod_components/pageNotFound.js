import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import "./home.css"

function renderBody(type){
	if(type === "noUser"){
		return(
			<div>
				<h3 style={{fontSize: 28, color: "#434343", fontWeight: 'bold'}}>Användaren finns inte!</h3>

				<p style={{fontSize: 16, marginBottom: 10, color: "#434343"}}>
					Användaren du letar efter verkar saknas. De kan raderat sitt konto eller så kan du ha sökt fel.
				</p>

				<Row type="flex" justify="space-between">
					<Link to="/agora">
						<Button type="primary" style={{ borderRadius: 10, marginTop: 20  }}>
							Tillbaka till agora
						</Button>
					</Link>
				</Row>
			</div>
		)
	}else{
		return(
			<div>
				<h3 style={{fontSize: 28, color: "#434343", fontWeight: 'bold'}}>Oops! 404!</h3>

				<p style={{fontSize: 18, marginBottom: 10, color: "#434343"}}>
					Sidan du letar efter verkar tyvärr inte finnas, försök igen!
				</p>
				<p style={{fontSize: 15, marginBottom: 10, color: "#919191"}}>
					 404-errorn är en felkod som i HTTP-protokollet betecknar att webbsidan som efterfrågats inte finns eller inte kan hittas.
				</p>

				<Row type="flex" justify="space-between">
					<Link to="">
						<Button type="primary" style={{ borderRadius: 10, marginTop: 20 }}>
							Tillbaka till landningssidan
						</Button>
					</Link>
				</Row>
			</div>
		)
	}
}

export default ({ type }) => {
	return(
		<Row type="flex" justify="center" style={{flex: 1}}>
			<Row type="flex" justify="center" style={{paddingTop: 160, maxWidth: 1200}}>

	      <Col>
	        <div>
	          <img src={require("resources/images/Whoops.png")} alt="whoops 404!"style={{height: 330, marginTop: -50}}/>
	        </div>
	      </Col>

	      <Col span={8}>
					{renderBody(type)}
	      </Col>
			</Row>
		</Row>
	)
}
