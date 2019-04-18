import React, { Component } from 'react';
import Router from './routes.js'
import { Provider } from 'react-redux'
import configureStore from './configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import history from './history.js'

const { store, persistor } = configureStore()

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
    		<PersistGate loading={null} persistor={persistor}>
      		<Router history={history} />
    		</PersistGate>
    	</Provider>
    )
  }
}

export default App;
