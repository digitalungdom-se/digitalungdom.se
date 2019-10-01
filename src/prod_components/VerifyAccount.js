import React from "react"
import {Row, Col, Button} from 'antd';
import { Link } from 'react-router-dom'
import Card from "@components/Card"
import Loading from "@components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { verifyAccount } from "actions/auth"

function renderBody( verified ){
  switch (verified) {
    case true:
      return(
        <Card
					title="Välkommen!🌟"
					style={{
						marginTop: 24,
					}}
				>

          <p style={{marginTop: -8}}>
            Nu är du medlem i Digital Ungdom!
          </p>

          <p>
            För tillfället finns det egentligen bara en sak du kan göra: Delta i vårt forum "Agora".
          </p>

          <p>
            I Agora kan du flexa dina sjuka git commits, hjälpa andra med deras buggar eller vad som helst som är teknik- och programmingsrelaterat!
          </p>

          <p>
            Men först måste du logga in hehe ;)
          </p>

          <Link to="/logga-in">
            <Button type="primary" style={{width: "100%"}}>
              Logga in
            </Button>
          </Link>

				</Card>
      )
    case false:
      return(
        <Card
          title="Oops!"
          style={{
            marginTop: 24,
          }}
        >

        <p style={{marginTop: -8, marginBottom: 30}}>
          Något verkar ha gått fel... Detta fel uppstår med största sannolikhet för att du redan verifierat ditt konto, pröva att logga in!
        </p>

        <Link to="/logga-in">
          <Button type="primary" style={{width: "100%"}}>
            Logga in
          </Button>
        </Link>

      </Card>
    )
    default:
      return <Loading/>
  }
}

function VerifyAccount({ token }) {

  const dispatch = useDispatch()
  dispatch(verifyAccount(token))

  const verified = useSelector(state => state.Auth.verified)

	return (
		<Row type="flex" justify="center" style={{flex:1}}
		>
			<Col
				xs= {{span: 22,}}
				sm={{span: 18}}
				md={{span: 14}}
				lg={{span: 10}}
				xl={{span: 8}}
			>
        {renderBody(verified)}
			</Col>
		</Row>
	)
}

export default VerifyAccount
