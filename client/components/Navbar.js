import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-custom navbar-expand-lg navbar-dark">
				<div class="container">
					<Link className="navbar-brand" to="/">WEconnect</Link>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto nav-pills">
							<li class="nav-item">
								<a class="nav-link" href="contact.html">CONTACT US</a>
							</li>
						</ul>
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<Link className="nav-link" to="/signup">Sign Up</Link>
							</li>
							<li class="nav-item">
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
