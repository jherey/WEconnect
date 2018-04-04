import React, { Component } from 'react';
import Navbar from './Navbar';

class Signin extends Component {
	render() {
		return (
			<div class="signup">
				<div class="login-form col-md-4 offset-md-4">
					<h1 class="title btn-primary">Sign In</h1>
					<form>
						<div class="form-group">
							<label>Username</label>
							<input type="text" name="" class="form-control" />
						</div>
						<div class="form-group">
							<label>Password</label>
							<input type="password" name="" class="form-control" />
						</div>
						<button id="signup" class="btn btn-primary">Login</button>
					</form>
				</div>
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
};

export default Signin;
