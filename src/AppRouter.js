import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Loading } from 'components'

const About				= lazy(() => import('routes/About'))
const Activities	= lazy(() => import('routes/Activities'))
const Agoria				= lazy(() => import('routes/Agoria'))
const Emergency		= lazy(() => import('components/Emergency'))
const Home				= lazy(() => import('routes/Home'))
const Login				= lazy(() => import('components/Login'))
const Register		= lazy(() => import('components/Register'))
const User				= lazy(() => import('routes/User'))

const AppRouter = () => (
	<Suspense fallback={<Loading />}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/loading" component={Loading} />
			<Route path="/bli-medlem" component={Register} />
			<Route path="/logga-in" component={Login} />
			<Route path="/state" component={Emergency} />
			<Route path="/agoria" component={Agoria} />
			<Route path="/om-oss" component={About} />
			<Route path="/verksamhet" component={Activities} />
			<Route path="/min-profil" component={User} />
		</Switch>
	</Suspense>
)

export default AppRouter
