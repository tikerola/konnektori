import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { persistor, store } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import openSocket from 'socket.io-client'
import * as serviceWorker from './serviceWorker';
import './index.css'

export const socket = openSocket('http://localhost:3001')
//export const socket = openSocket('https://love-app777.herokuapp.com')


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root') || document.createElement('div'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
