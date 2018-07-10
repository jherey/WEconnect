import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/HomePage.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import Signin from './components/users/Signin.jsx';
import Signup from './components/users/Signup.jsx';
import Register from './components/users/NewBusiness.jsx';
import EditBusiness from './components/users/EditBusiness.jsx';
import BusinessProfile from './components/users/BusinessProfile.jsx';
import AllBusinesses from './components/pages/AllBusinesses/AllBusinesses.jsx';
import Search from './components/common/SearchPage.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import authVerification from './utils/authVerification';
import styles from './public/styles/index.scss';

/**
 * @description Routes component
 * @class App
 * @extends {Component}
 */
class 	App extends Component {
  /**
   * @memberof App
   * @return {ReactElement} markup
   */
  render() {
    return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" exact component={Signin} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/businesses" exact component={AllBusinesses} />
						<Route path="/register" exact component={authVerification(Register)} />
						<Route path="/search" exact component={Search} />
						<Route path="/dashboard" exact component={authVerification(Dashboard)} />
						<Route path={'/:id'} exact component={BusinessProfile} />
						<Route path={'/:id/edit'} exact component={authVerification(EditBusiness)} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
    );
  }
}

export default App;
