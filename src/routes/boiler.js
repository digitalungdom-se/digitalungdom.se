import React, { Suspense, lazy } from 'react'
import { 
	Route,
	Switch,
	Link
} from 'react-router-dom'
import Header from 'containers/header'
import State from '@components/state'
import Wrapper from '@wrappers/boiler'
import { useSelector } from 'react-redux'
// import Home from 'containers/home'
import Loading from '@components/Loading'

const Agora = lazy(() => import('./agora.js'))
const Register = lazy(() => import('containers/Register.js'))
const Home = lazy(() => import('containers/home.js'))
const Login = lazy(() => import('containers/login.js'))

const NoMatch = () => <div>No match</div>

function App() {

	const theme = useSelector(state => state.Settings.theme)

	return (
		<Wrapper theme={theme}>
			<Wrapper.Header>
				<Header />
			</Wrapper.Header>
			<Wrapper.Content>
				<Suspense fallback={<Loading spin card />}>
					<Switch>
						<Route
							path="/" exact
							render={props => <Home {...props}/>}
						/>
						<Route
							path="/(logga-in|log-in)"
							render={props => <Login {...props}/>}
						/>
						<Route
							path="/(bli-medlem|register)"
							render={props => <Register {...props}/>}
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
	)
}

export default App