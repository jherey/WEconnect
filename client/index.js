import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import Routes from './Routes';
import allReducers from './reducers';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/userActions';

const store = createStore(
	allReducers,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
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
