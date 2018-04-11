import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './Routes';
import allReducers from './reducers';

const store = createStore(
	allReducers,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<Routes />
	</Provider>
, document.getElementById('app')
);
