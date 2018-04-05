import React, { Component } from 'react';
import Navbar from './Navbar';

class Signin extends Component {
	render() {
		return (
			<div class="signup">
				<div class="login-form col-md-4 offset-md-4">
					<h1 class="title btn-primary">Create Account</h1>
					<form>
						<label>First Name</label>
						<input type="text" name="" class="form-control" />
						<label>Last Name</label>
						<input type="text" name="" class="form-control" />
						<label>Username</label>
						<input type="text" name="" class="form-control" />
						<label>Email</label>
						<input type="email" name="" class="form-control" />
						<label>Password</label>
						<input type="password" name="" class="form-control" />
						<label for="exampleInputFile">Upload Image</label>
						<input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
						<button id="signup" class="btn btn-primary">Sign Up</button>
					</form>
				</div>
			</div>
		);
	}
};

export default Signin;
