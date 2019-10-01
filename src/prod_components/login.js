import React from 'react'
import { Link } from 'react-router-dom'
import {
  Alert, Form, Icon, Input, Row, Col, Button,
} from 'antd';
import Card from '@components/Card'

function Register({ loggingIn, loggingInError, login, Auth, translations, form }) {
	const { getFieldDecorator } = form

	const errorsAccount = {
		"no account": "Det finns inget sådant konto.",
		"not verified": "Du måste verifiera din e-mail innan du kan logga in."
	}


	return (
		<Row
			type="flex"
			justify="center"
		>
			<Card
				style={{
					marginTop: 24,
					width: "100%",
					maxWidth: 400
				}}
				title="Logga in"
			>
				<Form
					onSubmit={(e) => {
						e.preventDefault()
						form.validateFieldsAndScroll((err, values) => {
					    if (!err) {
					    	login({
					    		username: values.username,
					    		password: values.password
					    	})
					    }
					  })
					}}
				>
					<Form.Item
						hasFeedback={loggingInError === "no account"}
						validateStatus={["no account", "not verified"].indexOf(loggingInError) !== -1 ? "error" : null}
						help={errorsAccount[loggingInError]}
					>
						{getFieldDecorator('username', {
							rules: [{
								required: true,
								message: "Detta fält är obligatoriskt."
							}]
						})(
	          	<Input
	          		prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
	          		placeholder={translations["Username"] + "/" + translations["E-mail"]}
	          	/>
	          )}
					</Form.Item>

					<Form.Item
						hasFeedback={loggingInError === "incorrect password"}
						validateStatus={loggingInError === "incorrect password" ? "error" : null}
						help={loggingInError === "incorrect password" ? "Fel lösenord." : null}
					>
						{getFieldDecorator('password', {
							rules: [{
								required: true,
								message: "Detta fält är obligatoriskt."
							}]
						})(
	          	<Input
		          	type="password"
		          	placeholder={translations["Password"]}
	          		prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
	          	/>
	          )}
					</Form.Item>

					<Form.Item style={{marginBottom: 2}}>
						<Button
							style={{width: '100%', marginBottom: 0}}
							type="primary"
							htmlType="submit"
							loading={loggingIn}
						>
							{translations["Log in"]}
						</Button>
					</Form.Item>

					<Row>
            <Col style={{marginBottom: 16}}>
              <Link to="/forgot-password" style={{fontSize: 12}}>
                Glömt lösenord?
              </Link>
            </Col>

						<Col>
							<div>
								Saknar du ett konto?
								<Link to="/register"> Skapa ett här.</Link>
							</div>
						</Col>
					</Row>
				</Form>
			</Card>
		</Row>
	)
}

export default Form.create()(Register)
