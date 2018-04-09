import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import styles from './public/styles/index.scss';

render(
	<Routes />, document.getElementById('app')
);
