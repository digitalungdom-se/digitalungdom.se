import React, { Suspense, lazy } from 'react'
import { 
	Route,
	Switch
} from 'react-router-dom'
import Header from 'containers/header'
import State from '@components/state'
import Wrapper from '@wrappers/boiler'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ theme: state.Settings.theme })

const Agora = lazy(() => import('./agora.js'))
const Home = lazy(() => import('containers/home.js'))
const Login = lazy(() => import('containers/login.js'))

const NoMatch = () => <div>No match</div>
const Loading = () => <div>Loading...</div>

export default connect(mapStateToProps)(({ match, theme }) => (
	<Wrapper theme={theme}>
		<Wrapper.Header>
			<Header />
		</Wrapper.Header>
		<Wrapper.Content>
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
		</Wrapper.Content>
	</Wrapper>
))
