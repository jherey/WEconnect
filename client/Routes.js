import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/HomePage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import Signup from './components/Signup/Signup.jsx';
import Register from './components/NewBusiness/NewBusiness.jsx';
import EditBusiness from './components/EditBusiness/EditBusiness.jsx';
import BusinessProfile from './components/BusinessProfile/BusinessProfile.jsx';
import AllBusinesses from './components/AllBusinesses/AllBusinesses.jsx';
import Search from './components/Search/Search.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import FlashMessage from './components/FlashMessage/FlashMessage.jsx';
import authVerification from './utils/authVerification';
import styles from './public/styles/index.scss';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<FlashMessage />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" exact component={Signin} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/businesses" exact component={AllBusinesses} />
						<Route path="/register" exact component={authVerification(Register)} />
						<Route path="/search" exact component={Search} />
						<Route path="/dashboard" exact component={authVerification(Dashboard)} />
						<Route path={"/:id"} exact component={BusinessProfile} />
						<Route path={"/:id/edit"} exact component={authVerification(EditBusiness)} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;