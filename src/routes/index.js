import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Boiler from './boiler'
import ScrollToTop from "../prod_wrappers/scrollToTop"

export default () => (
	<Router>
		<ScrollToTop>
			<Boiler />
		</ScrollToTop>
	</Router>
)
