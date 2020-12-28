import './index.css';
import './i18n.ts';

import React, { Suspense } from 'react';

import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from 'app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback="Laddar..." /* Translation needed */>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
