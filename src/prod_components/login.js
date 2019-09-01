import React from 'react'
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Row, Col, Button,
} from 'antd';
import Card from '@components/Card'

function Register({ login, Auth, translations, form }) {
	const { getFieldDecorator } = form
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
					<Form.Item>
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

					<Form.Item>
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

					<Form.Item>
						<Button
						style={{width: '100%'}}
						type="primary"
						htmlType="submit">
							{translations["Log in"]}
						</Button>
					</Form.Item>

					<Row>
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
