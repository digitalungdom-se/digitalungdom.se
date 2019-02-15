import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import websiteApp from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// class AppProvider extends Component {
// 	static propTypes = {
// 		store: PropTypes.object.isRequired,
// 		children: PropTypes.node
// 	}

// 	constructor(props) {
// 		super(props);

// 		this.state = { rehydrated: false };
// 	}

// 	componentWillMount() {
// 		const opts = {
// 		 whitelist: ['user'] // <-- Your auth/user reducer storing the cookie
// 		}

// 	  persistStore(this.props.store, opts, () => {
// 	  	this.setState({ rehydrated: true });
// 	  });
// 	}
//   render() {
//   	if (!this.state.rehydrated) {
//   		return null;
//   	}

//   	return (
//   		<Provider store={this.props.store}>
//   			{this.props.children}
//   		</Provider>
//   		);
//   }
// }

// AppProvider.propTypes = {
//     store: PropTypes.object.isRequired,
//     children: PropTypes.node
// }


const store = createStore(websiteApp, applyMiddleware(thunkMiddleware))

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
