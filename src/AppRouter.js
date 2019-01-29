import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home.js'
import Login from './Login.js'
import Register from './Register.js'
import Emergency from './Emergency.js'
import Blog from './Blog.js'
import About from './About.js'
import Activities from './Activities.js'

const AppRouter = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/bli-medlem" component={Register} />
			<Route path="/logga-in" component={Login} />
			<Route path="/state" component={Emergency} />
			<Route path="/blog" component={Blog} />
			<Route path="/om-oss" component={About} />
			<Route path="/verksamhet" component={Activities} />
		</Switch>
	</Suspense>
)

export default AppRouter
