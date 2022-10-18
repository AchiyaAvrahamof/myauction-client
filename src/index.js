import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userReducer from './features/user'
import {BrowserRouter as Router} from 'react-router-dom';
import productReducer from './features/prodacts'
import productIndexReducer from './features/productIndex';
const store=configureStore({
  reducer:{
    user: userReducer,
    product:productReducer,
    productIndex:productIndexReducer
  },

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
