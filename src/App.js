import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import './App.css'
import { Layout, LocaleProvider } from 'antd'
import DUHeader from './Header.js'
import DUFooter from './Footer.js'
import sv_SE from 'antd/lib/locale-provider/sv_SE';
import AppRouter from './AppRouter.js'

// const Login = lazy(() => import('./Login.js'))

const { Header, Content, Footer } = Layout

const AppDOM = () => (
	<Router>
		<Layout style={{minHeight: '100vh'}}>
			<Header
				style={{padding: 0}}
			>
				<DUHeader />
			</Header>
			<Content style={{marginBottom: '20px'}}>
				<AppRouter />
			</Content>
			<Footer style={{padding: 0}}>
				<DUFooter />
			</Footer>
		</Layout>
	</Router>
)

class App extends Component {
  render() {
    return (
    	<LocaleProvider locale={sv_SE}>
      	<AppDOM />
      </LocaleProvider>
    );
  }
}

export default App;
