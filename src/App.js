import React, { Component } from 'react';
import Router from './routes'
import { Provider } from 'react-redux'
import configureStore from './configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import history from './history.js'

const { store, persistor } = configureStore()

class App extends Component {
  render() {
    return (
    	<React.Suspense fallback={<div>Loading...</div>}>
	    	<Provider store={store}>
	    		<PersistGate loading={null} persistor={persistor}>
	      		<Router history={history} />
	    		</PersistGate>
	    	</Provider>
	    </React.Suspense>
    )
  }
}

export default App;
