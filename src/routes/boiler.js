import React, { Suspense, lazy } from 'react'
import {
	Route,
	Switch,
	Link
} from 'react-router-dom'
import Header from 'containers/header'
import Footer from 'containers/footer'
import State from '@components/state'
import Wrapper from '@wrappers/boiler'
import { useSelector } from 'react-redux'
// import Home from 'containers/home'
import Loading from '@components/Loading'

const Agora = lazy(() => import('./agora.js'))
const Register = lazy(() => import('containers/Register.js'))
const Home = lazy(() => import('containers/home.js'))
const About = lazy(() => import('containers/about.js'))
const Login = lazy(() => import('containers/login.js'))

const NoMatch = lazy(() => import('containers/pageNotFound.js'))


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
							path="/(om-oss|about)"
							render={props => <About {...props}/>}
						/>
						<Route
							path="/(logga-in|login)"
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
			<Wrapper.Footer>
				<Footer />
			</Wrapper.Footer>
		</Wrapper>
	)
}

export default App
