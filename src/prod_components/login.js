import React from 'react'
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Row, Col, Button,
} from 'antd';

//FIXA: Gör så att register länken fungerar med translations

function Register({ login, Auth, translations, form }) {
	const { getFieldDecorator } = form
	return (
		<Row type="flex" justify="center" style={{width: '100%', position: 'absolute'}}>
			<Col
				style ={{backgroundColor: 'white', width: 520, top: 80, paddingTop: 26, paddingLeft: 76, paddingRight: 76, margin: 30, borderRadius: 10, border:'1px solid rgba(0,0,0,0.1)'}}
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
						// const { username, password } = e.target
						// login({
						// 	username: username.value,
						// 	password: password.value
						// })
					}}
				>

					<Row>
						<Col>
							<h1 style={{marginBottom: 30, textAlign: 'center', color: 'rgba(1,45,213,0.6)', fontSize: 24}}>Logga in</h1>
						</Col>
					</Row>

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

					<Row style={{margin: 40}}>
						<Col>
							<div>
								Saknar du ett konto?
								<Link to="/register"> Skapa ett här.</Link>
							</div>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	)
}

export default Form.create()(Register)
