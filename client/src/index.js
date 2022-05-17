import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import miscellaneousRed from './store/reducers/miscellaneous';
import userRed from './store/reducers/user';
import configRed from './store/reducers/config';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  userRed,
  miscellaneousRed,
  configRed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
