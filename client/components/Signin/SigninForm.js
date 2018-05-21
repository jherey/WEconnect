import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

class SigninForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '' });
		this.props.signinUser(this.state)
			.then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Signed in successfully'
					});
					this.context.router.history.push('/dashboard');
				},
				(err) => {
					this.props.loading(false);
					this.props.addFlashMessage({
						type: 'error',
						text: err.response.data.message
					});
				}
			);
	}

	render() {
		const { username, password, errors } = this.state;
		const { isLoading } = this.props;

		if(isLoading) { return <Spinner />; }

		return (
			<div className="form-signin">
				<div className="login-form container py-5">
					<h1 className="text-center" style={{'color': 'white'}}>Sign In</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							<form onSubmit={this.onSubmit}>
								<div className="form-group row">
									<div className="col-sm-12">
										<label>Username</label>
										<input
											value={username}
											onChange={this.onChange}
											type="text"
											name="username"
											className="form-control"
										/>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-12">
										<label>Password</label>
										<input
											value={password}
											onChange={this.onChange}
											type="password"
											name="password"
											className="form-control"
										/>
										{errors === 'Password is required' && <div className='alert alert-danger'>{errors}</div>}
										{errors === 'Minimum password length is 5 characters' && <div className='alert alert-danger'>{errors}</div>}
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-12">
										<button
											id="signup"
											className="btn btn-orange btn-lg"
											disabled={isLoading}
										>
											Login
										</button>
										<p id="signin-link">Don't have an account?<span><Link to="/signup"> Sign Up</Link></span></p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			// <div className="form">
			// 	<h1 className="text-center" style={{'color': 'white'}}>Sign In</h1>
			// 	<div className="login-form col-md-4 offset-md-4">
					
			// 		{errors === 'Username/Password Incorrect' && <div className='alert alert-danger'>{errors}</div>}
			// 		<form onSubmit={this.onSubmit}>
			// 			<div>
			// 				<label>Username</label>
			// 				<input
			// 					value={username}
			// 					onChange={this.onChange}
			// 					type="text"
			// 					name="username"
			// 					className="form-control"
			// 				/>
			// 				{errors === 'Username is required' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<label>Password</label>
			// 				<input
			// 					value={password}
			// 					onChange={this.onChange}
			// 					type="password"
			// 					name="password"
			// 					className="form-control"
			// 				/>
			// 				{errors === 'Password is required' && <div className='alert alert-danger'>{errors}</div>}
			// 				{errors === 'Minimum password length is 5 characters' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<button
			// 					id="signup"
			// 					className="btn btn-orange btn-lg"
			// 					disabled={isLoading}
			// 				>
			// 					Login
			// 				</button>
			// 			</div>
			// 		</form>
			// 	</div>
			// 	<br />
			// 	<br />
			// </div>
		);
	}
}

SigninForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default SigninForm;
