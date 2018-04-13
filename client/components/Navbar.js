import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../actions/userActions';

class Navbar extends Component {
	signout(e) {
		e.preventDefault();
		this.props.signout();
	}

	render() {
		const { isAuthenticated } = this.props.authUser;

		const authUserLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Register a Business</Link>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#" onClick={this.signout.bind(this)}>Sign out</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/signup">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">WEconnect</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{ isAuthenticated ? authUserLinks : guestLinks }
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authUser: state.authUser
	}
}

export default connect(mapStateToProps, { signout })(Navbar);
