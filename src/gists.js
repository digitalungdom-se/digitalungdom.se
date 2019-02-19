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
