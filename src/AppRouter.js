import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from './Loading.js'
// import User from './User.js'
const About = lazy(() => import('./About.js'))
const Activities = lazy(() => import('./Activities.js'))
const Blog = lazy(() => import('./Blog.js'))
const Emergency = lazy(() => import('./Emergency.js'))
const Home = lazy(() => import('./Home.js'))
const Login = lazy(() => import('./Login.js'))
const Register = lazy(() => import('./Register.js'))
const User = lazy(() => import('./User.js'))

const AppRouter = () => (
	<Suspense fallback={<Loading />}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/loading" component={Loading} />
			<Route path="/bli-medlem" component={Register} />
			<Route path="/logga-in" component={Login} />
			<Route path="/state" component={Emergency} />
			<Route path="/blog" component={Blog} />
			<Route path="/om-oss" component={About} />
			<Route path="/verksamhet" component={Activities} />
			<Route path="/u/:username" component={User} />
		</Switch>
	</Suspense>
)

export default AppRouter
