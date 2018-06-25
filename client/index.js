import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt from 'jsonwebtoken';
import Routes from './routes.jsx';
import allReducers from './reducers/rootReducer';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/userActions';

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

render(
	<Provider store={store}>
		<Routes />
	</Provider>
  , document.getElementById('app')
);
