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