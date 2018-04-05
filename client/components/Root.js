import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Signin from './Signin';
import Signup from './Signup';
import Register from './Register';
import BusinessProfile from './BusinessProfile';

class Root extends Component {
	render() {
		return (
			<div className="">
				<Navbar />
				<main>
					<Switch>
						<Route path="/index" exact component={Home} />
						<Route path="/signin" exact component={Signin} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/register" exact component={Register} />
						<Route path="/business" exact component={BusinessProfile} />
					</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}

export default Root;
