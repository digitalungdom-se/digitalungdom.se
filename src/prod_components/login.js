import React from 'react'
import {
  Form, Icon, Input, Row, Col, Button,
} from 'antd';

//FIXA: Gör så att register länken fungerar med translations

export default ({ login, Auth, translations }) => (
	<Row type="flex" justify="center" style={{width: '100%', position: 'absolute'}}>
		<Col
			style ={{backgroundColor: 'white', width: 520, paddingTop: 26, paddingLeft: 76, paddingRight: 76, margin: 30, borderRadius: 10, border:'1px solid rgba(0,0,0,0.1)'}}
		>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					const { username, password } = e.target
					login({
						username: username.value,
						password: password.value
					})
				}}
			>

				<Row>
					<Col>
						<h1 style={{marginBottom: 30, textAlign: 'center', color: 'rgba(1,45,213,0.6)', fontSize: 24}}>Logga in</h1>
					</Col>
				</Row>

				<Form.Item>
						<Input
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder={translations["Username"] + "/" + translations["E-mail"]}
						/>
				</Form.Item>

				<Form.Item>
					<Input
					type="password"
					placeholder={translations["Password"]}
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					/>
				</Form.Item>

				<Form.Item>
					<Button
					style={{width: '100%'}}
					type="primary"
					htmlType="submit">
						{translations["Log in"]}
					</Button>
				</Form.Item>

				<Row style={{marginTop: 40}}>
					<Col>
						<div>
							Ny till Digtal Ungdom?
							<a href="register"> Skapa ett konto.</a>
						</div>
					</Col>
				</Row>

				<div>
					{Auth.loggingIn && translations["Logging in"] + "..."}<br/>
					{Auth.loginResponse && Auth.loginResponse + ''}<br />
					{Auth.loginResponse === 'fail' && JSON.stringify(Auth.reason)}
				</div>
			</Form>
		</Col>
	</Row>
)
