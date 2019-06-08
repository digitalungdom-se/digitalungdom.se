import React, { Suspense, lazy } from 'react'
import { 
	Route,
	Switch
} from 'react-router-dom'
import {
	Header,
} from 'containers'
import { State } from '@components'
import { boiler as Wrapper } from '@wrappers'

const Agora = lazy(() => import('./agora.js'))
const Home = lazy(() => import('containers/home.js'))
const Login = lazy(() => import('containers/login.js'))

const NoMatch = () => <div>No match</div>
const Loading = () => <div>Loading...</div>

export default ({ match }) => (
	<Wrapper>
		<Wrapper.Header>
			<Header />
		</Wrapper.Header>
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route
				path="/" exact
				render={props => <Home {...props}/>}
				/>
				<Route
				path="/(logga-in|login)"
				render={props => <Login {...props}/>}
				/>
				<Route
				path="/agora"
				render={props => <Agora {...props} />} 
				/>
				<Route
				path="/state/:create?"
				render={props => <State {...props}/>}
				/>
				<Route component={NoMatch} />
			</Switch>
		</Suspense>
	</Wrapper>
)
