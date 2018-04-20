import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Register from './components/NewBusiness/NewBusiness';
import EditBusiness from './components/EditBusiness/EditBusiness';
import BusinessProfile from './components/BusinessProfile/BusinessProfile';
import AllBusinesses from './components/AllBusinesses/AllBusinesses';
import Search from './components/Search/Search';
import FlashMessage from './components/FlashMessage/FlashMessage';
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
						<Route path="/all" exact component={AllBusinesses} />
						<Route path="/register" exact component={authVerification(Register)} />
						<Route path="/search" exact component={Search} />
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