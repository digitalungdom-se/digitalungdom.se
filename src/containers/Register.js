import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { register, checkEmail, checkUsername } from 'actions/register.js'
import RegisterForm from '@components/RegisterForm'
import Card from '@components/Card'


function renderSlides(currentSlide, changeSlide){
	const dispatch = useDispatch()
	const dispatchCheckUsername = username => dispatch(checkUsername(username))
	const dispatchCheckEmail = email => dispatch(checkEmail(email))
	const dispatchRegister = email => dispatch(register(email))
	const username = useSelector(state => state.Auth.username)
	const usernameAvailable = useSelector(state => state.Register.usernameAvailable)
	const emailAvailable = useSelector(state => state.Register.emailAvailable)
	const checkingUsername = useSelector(state => state.Register.checkingUsername)
	const checkingEmail = useSelector(state => state.Register.checkingEmail)
	const registering = useSelector(state => state.Register.registering)

	switch(currentSlide){
		case 0:
			return(
				<RegisterForm
					dispatch={dispatch}
					register={dispatchRegister}
					incrementSlide={()=> changeSlide(currentSlide + 1)}
					decrementSlide={()=> changeSlide(currentSlide - 1)}
					checkUsername={dispatchCheckUsername}
					checkEmail={dispatchCheckEmail}
					username={username}
					checkingUsername={checkingUsername}
					checkingEmail={checkingEmail}
					registering={registering}
					usernameAvailable={usernameAvailable}
					emailAvailable={emailAvailable}
				/>
			)
		case 1:
			return(
				<div style={{padding: '0 30px'}}>
					<h2 style={{fontSize: 18, color: "rgba(0,0,0,0.8)"}}>
						Nu har vi skickat ett verifieringsmail till dig!
					</h2>
					<p >
						Logga in på din email och tryck på verifierings-länken som är bifogad i vårt email. Ifall du inte hittar mailet kan den ha hamnat i skräpposten, så glöm inte att dubbelkolla!
					</p>
					<p>
						När du tryckt på länken kommer en ny flik öppnas där du är inloggad som medlem i digitalungdom.se!🌟
					</p>
					<Button
					style={{width: '100%'}}
					onClick={()=> changeSlide(1)}
					>
						Tillbaka till registreringen
					</Button>
				</div>
			)
	}
}

function Register() {
	const [ currentSlide, changeSlide ] = useState( 0 );

	return (
		<Row type="flex" justify="center" style={{flex:1}}
		>
			<Col
				// style ={{backgroundColor: 'white', width: 520, paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 100, borderRadius: 10, border:'1px solid rgba(0,0,0,0.1)'}}
				xs= {{
					span: 24,
				}}
				sm={{
					span: 20
				}}
				md={{
					span: 15
				}}
				lg={{
					span: 11
				}}
				xl={{
					span: 8
				}}
				style={{
					maxWidth: 520
				}}
			>
				<Card
					title="Bli medlem"
					style={{
						marginTop: 24,
					}}
				>

					{renderSlides(currentSlide, changeSlide)}

				</Card>
			</Col>
		</Row>
	)
}

export default Register
