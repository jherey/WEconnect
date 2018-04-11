import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">WEconnect</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto nav-pills">
							<li className="nav-item">
								<a className="nav-link" href="contact.html">CONTACT US</a>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/signup">Sign Up</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signin">Sign In</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
