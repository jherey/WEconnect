import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Root from '../components/Root';
import Signin from '../components/Signin';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to={'/'}>Home</Link></li>
						<li><Link to={'/Login'}>Signin</Link></li>
					</ul>
					<hr />

					<Switch>
						<Route exact path='/' component={Root} />
						<Route exact path='/Login' component={Signin} />
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;