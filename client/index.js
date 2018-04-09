import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './Routes';
import styles from './public/styles/index.scss';

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<Routes />
	</Provider>
, document.getElementById('app')
);
