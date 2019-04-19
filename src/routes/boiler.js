import React from 'react'
import { 
	Route,
	Switch
} from 'react-router-dom'
import {
	Header,
	Home,
	Login
} from 'containers'
import { State } from '@components'
import Agora from './agora.js'
import { boiler as Wrapper } from 'wrappers'

const NoMatch = () => <div>No match</div>

export default ({ match }) => (
	<Wrapper>
		<Wrapper.Header>
			<Header />
		</Wrapper.Header>
		<Switch>
			<Route path="/" exact component={Home}/>
			<Route path="/logga-in" component={Login}/>
			<Route path="/agora" component={Agora}/>
			<Route path="/state/:create?" component={State}/>
			<Route component={NoMatch} />
		</Switch>
	</Wrapper>
)
