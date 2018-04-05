import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Root from './components/Root';
import styles from './public/styles/index.scss';

const App = () => (
	<BrowserRouter>
		<Root />
	</BrowserRouter>
);

render(
	<App />, document.getElementById('app')
);
