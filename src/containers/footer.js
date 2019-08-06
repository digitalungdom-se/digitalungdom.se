import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
	<div>
		<h1>Välkommen till Digital Ungdom!</h1>
		<p>
			Digital Ungdom är ett förbund för programmerings- och teknikintresserade ungdomar.
			Vi rekommenderar att du <Link to="bli-medlem">blir medlem</Link>, eller <Link to="logga-in">loggar in</Link> för att kunna ta del av hemsidan.
		</p>
	</div>
)
