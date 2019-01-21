import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css'
import './Navbar.css'
import { Layout } from 'antd'
import Home from './Home.js'
import Login from './Login.js'
import Register from './Register.js'
import DUHeader from './Header.js'
import Emergency from './Emergency.js'

// const Login = lazy(() => import('./Login.js'))

const { Header, Content, Footer } = Layout

const AppRouter = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/blimedlem" component={Register} />
			<Route path="/loggain" component={Login} />
			<Route path="/state" component={Emergency} />
		</Switch>
	</Suspense>
)

const AppDOM = () => (
	<Router>
		<Layout style={{minHeight: '100vh'}}>
			<Header>
				<DUHeader />
			</Header>
			<Content>
				<AppRouter />
			</Content>
			<Footer />
		</Layout>
	</Router>
)

class App extends Component {
  render() {
    return (
      <AppDOM
      />
    );
  }
}

export default App;
