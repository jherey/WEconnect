import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Register from './components/Register';
import EditBusiness from './components/EditBusiness';
import BusinessProfile from './components/BusinessProfile';
import styles from './public/styles/index.scss';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" exact component={Signin} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/register" exact component={Register} />
						<Route path="/edit" exact component={EditBusiness} />
						<Route path="/business" exact component={BusinessProfile} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;