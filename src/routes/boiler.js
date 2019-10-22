import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'containers/header'
import Footer from '@components/footer'
import State from '@components/state'
import Wrapper from '@wrappers/boiler'
import { useSelector } from 'react-redux'
// import Home from 'containers/home'
import Loading from '@components/Loading'

const Agora = lazy(() => import('./agora.js'))
const Register = lazy(() => import('containers/Register.js'))
const Home = lazy(() => import('@components/home.js'))
const About = lazy(() => import('@components/about.js'))
const Login = lazy(() => import('containers/login.js'))
const User = lazy(() => import('containers/User'))
const VerifyAccount = lazy(() => import('@components/VerifyAccount.js'))
const ResetPassword = lazy(() => import('containers/Auth/ResetPassword.js'))
const ForgotPassword = lazy(() => import('containers/Auth/ForgotPassword.js'))
const PageNotFound = lazy(() => import('@components/pageNotFound'))


function App() {

	const theme = useSelector(state => state.Settings.theme)

	return (
		<Wrapper theme={theme}>
			<Wrapper.Header>
				<Header />
			</Wrapper.Header>
			<Wrapper.Content>
				<Suspense fallback={<Loading spin />}>
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
							render={props => <Login onAuthorized={(username) => props.history.push('/@' + username)} {...props}/>}
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
							path="/verify/:token"
							render={props => <VerifyAccount token={props.match.params.token} />}
						/>
						<Route
							path="/reset/:token"
							render={props => <ResetPassword token={props.match.params.token} />}
						/>
						<Route
							path="/forgot-password"
							render={props => <ForgotPassword/>}
						/>
						<Route
							path="/@:user"
							render={props => <User username={props.match.params.user} />}
						/>
						<Route
							path="/state/:create?"
							render={props => <State {...props}/>}
						/>
						<Route render={props => <PageNotFound {...props} />} />
					</Switch>
				</Suspense>
			</Wrapper.Content>
			<Footer />
		</Wrapper>
	)
}

export default App
