import React from 'react';
import ReactDOM from 'react-dom/client';

//import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';

//redux-thunk is a middleware for Redux that allows writing action creators that return functions instead of actions. This allows for async logic in action creators.
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

import App from './App';

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
