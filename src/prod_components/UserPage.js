import React, {useState} from 'react'
import { Button, Row, Col, Card, Avatar, Skeleton, Form, Select, Icon, Input } from 'antd'
import Loading from '@components/Loading'
import ProfilePicture from 'containers/ProfilePicture'

const userColor = "pink";

const handleSubmit = (e) => {
	e.preventDefault();
	this.props.form.validateFieldsAndScroll((err, values) => {
		if (!err) {
			console.log('Received values of form: ', values);
			this.props.register({
				...values,
				birthdate: values.birthdate.format('YYYY-MM-DD')
			})
		}
	});
}

function renderProfile(user){

	const [editing, setEditing] = useState(false);

	if(editing === false){
		return(
			<div>
				<h2 style={{margin: 0, fontWeight: 'bold'}}>
					{user.details.name}
				</h2>

				<p style={{fontSize:17, marginTop: -4}}>
					@{user.details.username}
				</p>

				<p style={{ marginTop: 12, marginBottom: 16, color: 'rgba(0,0,0,0.9)', fontSize: 16}}>
					{user.profile.bio}
				</p>

				<div
				style={{fontSize:12}}>
					Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}
				</div>

				<Button
				ghost
				onClick={()=> {
					setEditing(!editing)
					console.log("hey")
					}
				}
				style={{color: "rgba(0,0,0,0.5)", width: '100%', marginTop: 20, border: "1px solid rgba(0,0,0,0.2)"}}
				>
					Redigera profil
				</Button>
			</div>
		)
	}else{

		const { getFieldDecorator } = this.props.form;

		return (Form.create()(
			<Form
				style={{ padding: "30px 30px 0 30px " }} onSubmit={this.handleSubmit}
			>
				<Row>
					<Col>
						<h1 style={{marginBottom: 30, textAlign: 'center', color: 'rgba(1,45,213,0.6)', fontSize: 24}}>Bli medlem</h1>
					</Col>
				</Row>

				<Form.Item>
					{getFieldDecorator('name', {
						rules: [{
							required: true, message: 'Fyll i ditt namn', whitespace: true,
						},
						{
							pattern:/^((.+)\s)((.+)\s*){1,}$/, message: 'Du måste uppge för- och efternamn.'
						},
						{
							pattern: /^(([A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.\ ]+))$/, message: 'Otillåtna karaktärer.'
						}],
					})(
						<Input
						prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder="Namn"
						/>
					)}
				</Form.Item>

				<Form.Item>
					{getFieldDecorator('gender', {
						rules: [{
							required: true, message: 'Välj ett alternativ.',
						}],
					})(
						<Select
						placeholder="Kön"
						>
							<Select.Option value="0">Man</Select.Option>
							<Select.Option value="1">Kvinna</Select.Option>
							<Select.Option value="2">Annat</Select.Option>
							<Select.Option value="3">Vill ej uppge</Select.Option>
						</Select>
					)}
				</Form.Item>

				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: 'Välj ett lösenord!',
						}, {
							validator: this.validateToNextPassword,
						}, {
							pattern: /((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/, message: 'Lösenordet måste innehålla både bokstäver och siffror.'
						}, {
							min: 8, max: 72, message: 'Lösenordet måste vara mellan 8 och 72 karaktärer.'
						}],
					})(
						<Input
						type="password"
						placeholder="Lösenord"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						/>
					)}
				</Form.Item>

				<Form.Item style={{marginBottom: 14}}>
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: 'Bekräfta ditt lösenord',
						}, {
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input
						type="password"
						placeholder="Bekräfta lösenord"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onBlur={this.handleConfirmBlur} />
					)}
				</Form.Item>

				<Form.Item>
					<Button
					style={{width: '100%'}} type="primary" htmlType="submit"
					loading={this.props.registering}
					>
						Spara
					</Button>

					<Button
					style={{width: '100%'}} type="primary" htmlType="submit"
					loading={this.props.registering}
					>
						Avbryt
					</Button>
				</Form.Item>
			</Form>
		))
	}
}

function UserPage({ user, loading }) {

	if (loading || !user.profile) return <Loading />
	console.log(user)
	return (
		<div>

			<Row
			type="flex"
			justify="center"
			style={{marginTop: 30}}>

				<Col
				xs={{ span: 22 }}
				sm={{ span: 22 }}
				md={{ span: 20 }}
				lg={{ span: 18 }}
				xl={{ span: 16 }}>

					<Row
					style={{width: "100%"}}
					type = "flex"
					justify="space-between">

						<Col
						xs={{span: 0}}
						sm={{span: 0}}
						md={{span: 7}}
						lg={{span: 7}}
						type = "flex" justify="center">
							<Col
								style={{
									background: "white",
									border:'1px solid rgba(0,0,0,0.1)',
									borderRadius: 8,
								}}
							>
								<Row
								type="flex"
								justify="start"
									style={{
										background: user.profile.color? user.profile.color: '#83aef2',
										padding: 10,
										borderTopRightRadius: 8,
										borderTopLeftRadius: 8,
										textAlign: 'center',
										height: 80,
										marginBottom: 20,
										paddingTop: 20,
										paddingLeft: 30,
									}}>
									<Col>
										<ProfilePicture style={{position: 'absolute'}} username={user.details.username} size={80}/>
									</Col>
								</Row>

								<div style={{ padding: "16px 30px", fontSize: 14}}>

									{
										renderProfile(user)
									}

								</div>
							</Col>
						</Col>

            <Col
            xs={{ span: 22 }}
            sm={{ span: 22 }}
            md={{ span: 16 }}
            lg={{ span: 16 }}>

              <div>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
              </div>

            </Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default UserPage
