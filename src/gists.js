{mobileVersion ?
	(
		<div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
			<Link to="/logga-in">
				<Button>
					Logga in
				</Button>
			</Link>
			<Link to="/bli-medlem">
				<Button type="primary">
					Bli medlem
				</Button>
			</Link>
		</div>
	) : null
}

const AuthButtons = this.props.Auth.username ? <ProfilePopover /> : (
	<Col
		xs={{span: 0}}
		sm={{span: 4}}
		md={{span: 7}}
		xl={{span: 5}}
	>
		<Row
			type="flex"
			justify="space-around"
		>
			<Col
			xs={{span: 0}}
				md={{span: 12}}
				style={{textAlign: 'center'}}
			>
				<Link to="/logga-in">
					<Button>
						Logga in
					</Button>
				</Link>
			</Col>
			<Col xs={{span: 0}} sm={{span: 0}} md={{span: 12}} style={{textAlign: 'center'}}>
				<Link to="/bli-medlem">
					<Button type="primary">
						Bli medlem
					</Button>
				</Link>
			</Col>
		</Row>
	</Col>
)

			  <Col
			  	xs={{span: 2}}
			  	sm={{span: 16}}
			  	md={{span: 9}}
			  >
			  	<ResponsiveNav
				    menuMarkup={MenuMarkup}
				    activeLinkKey={location.pathname}
				    placement="bottom"
					/>
			  </Col>

			  <Col
			  	xs={{span: 0}}
			  	sm={{span: 4}}
			  	md={{span: 7}}
			  	xl={{span: 5}}
			  >
			  	<AuthButtons />
			  </Col>



<Col
	sm={{span: 0}}
	md={{span: 6}}
	lg={{span: 6}}
	style={{padding: 10}}
>
	<Card>
		<h1>Hem</h1>
		<Link to="/Agora/skapa-inlagg">
			<Button
				style={{width: '100%'}}
				type="primary"
			>
				Skapa inlägg
			</Button>
		</Link>
	</Card>
</Col>

<code
	className="date"
>
	{this.formatDate(new Date())}
</code>
<h1
	className="title"
>
	Hello, world!
</h1>
<h4
	className="user"
>
	Nautman
</h4>
<ReactMarkdown source={'Hello'} />

		// let day = date.getDate()
		// let month = date.getMonth()
		// let year = date.getFullYear()

		// let diff
		// if(day === today.day) {
		// 	let hours = date.getHours()
		// 	if(hours === today.hours) {
		// 		let minutes = date.getHours()
		// 		if(minutes === today.minutes) {
		// 			let seconds = date.getHours()
		// 			if(today.seconds - seconds < 10) {
		// 				return 'några sekunder sedan'
		// 			} return today.seconds - seconds + ' sekunder sedan'
		// 		} else return today.minutes - minutes + ' minuter sedan'
		// 	} else return today.hours - hours + ' timmar sedan'
		// } else {
		// 	if(year === today.year) {
		// 		if(month === today.month) {
		// 			return today.day - day + ' dagar sedan'
		// 		} else return day + '/' + month
		// 	} else return day + '/' + month + '/' + year
		// }


		<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '# ' )}
								>
									h1
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '## ' )}
								>
									h2
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '### ' )}
								>
									h3
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={() => this.setState({linkModal: true})}
								>
									<Icon type="link" />
								</Button>
								<Button
									onClick={() => this.setState({imgModal: true})}
								>
									<Icon type="picture" />
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'b' )}
								>
									<Icon type="bold" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'i' )}
								>
									<Icon type="italic" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'code' )}
								>
									<Icon component={code}/>
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '1. ' )}
								>
									<Icon type="ordered-list" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '* ' )}
								>
									<Icon type="bars"/>
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'h_rule' )}
								>
									<Icon component={h_rule}/>
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '> ' )}
								>
									<Icon component={quote}/>
								</Button>
							</Button.Group>
						</Col>