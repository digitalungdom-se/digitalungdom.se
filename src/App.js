import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout, LocaleProvider } from 'antd'
import { Header, Footer } from 'components'
import sv_SE from 'antd/lib/locale-provider/sv_SE'
import AppRouter from './AppRouter'
import 'resources/App.css'

const { Content } = Layout

const AppDOM = () => (
	<Router>
		<Layout style={{minHeight: '100vh'}}>
			<Layout.Header
				style={{padding: 0}}
			>
				<Header />
			</Layout.Header>
			<Content style={{marginBottom: 20}}>
				<AppRouter />
			</Content>
			<Layout.Footer style={{padding: 0}}>
				<Footer />
			</Layout.Footer>
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
