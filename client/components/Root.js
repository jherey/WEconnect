import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

class Root extends Component {
	render() {
		return (
			<div className="">
				<Navbar />
				<main>
					<Switch>
						<Route path="/" exact component={Home} />
					</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}

export default Root;
