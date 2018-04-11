import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class SignupForm extends Component {
	constructor() {
		super();
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			sex: '',
			email: '',
			profilepic: '',
			password: '',
			confirmPassword: '',
			errors: '',
			isLoading: false
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
		// const { history } = this.props;
		this.setState({ errors: '', isLoading: true });
		this.props.signupUser(this.state).then(
			() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'Welcome! You signed up successfully!'
				})
				this.context.router.history.push('/');
			},
			(data) => this.setState({ errors: data.response.data.message, isLoading: false })
		);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="signup">
				<div className="login-form col-md-4 offset-md-4">
					<h1 className="title btn-primary">Create Account</h1>
					<form onSubmit={this.onSubmit}>
						<div className={classnames( { 'has-error': errors })}>
							<label className='control-label'>First Name</label>
							<input
								value={this.state.firstname}
								onChange={this.onChange}
								type="text"
								name="firstname"
								className="form-control"
							/>
							{errors === 'Firstname is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Last Name</label>
							<input
								value={this.state.lastname}
								onChange={this.onChange}
								type="text"
								name="lastname"
								className="form-control"
							/>
							{errors === 'Lastname is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Username</label>
							<input
								value={this.state.username}
								onChange={this.onChange}
								type="text"
								name="username"
								className="form-control"
							/>
							{errors === 'Username is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Email</label>
							<input
								value={this.state.email}
								onChange={this.onChange}
								type="email"
								name="email"
								className="form-control"
							/>
							{errors === 'Email is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Password</label>
							<input
								value={this.state.password}
								onChange={this.onChange}
								type="password"
								name="password"
								className="form-control"
							/>
							{errors === 'Password is required' || errors === 'Minimum password length is 5 characters' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Confirm Password</label>
							<input
								value={this.state.confirmPassword}
								onChange={this.onChange}
								type="password"
								name="confirmPassword"
								className="form-control"
							/>
							{errors === 'Confirm password field is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Sex</label>
							<select
								className='form-control'
								name='sex'
								onChange={this.onChange}
								value={this.state.sex}
							>
								<option value='' disabled>Choose your sex</option>
								<option value='male'>Male</option>
								<option value='female' default>Female</option>
							</select>
						</div>
						<div>
							<label className='control-label' htmlFor="exampleInputFile">Upload Image</label>
							<input
								type="file"
								className="form-control-file"
								id="exampleInputFile"
								aria-describedby="fileHelp"
								value={this.state.profilepic}
								name="profilepic"
							/>
						</div>
						<button
							id="signup"
							disabled={this.state.isLoading}
							className="btn btn-primary btn-lg"
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		);
	}
}

SignupForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default SignupForm;