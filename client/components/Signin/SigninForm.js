import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SigninForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
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
		this.setState({ errors: '', isLoading: true });
		this.props.signinUser(this.state).then(
			() => {
				this.context.router.history.push('/');
			},
			(data) => this.setState({ errors: data.response.data.message, isLoading: false })
		);;
	}

	render() {
		const { username, password, errors, isLoading } = this.state;

		return (
			<div className="signup">
				<div className="login-form col-md-4 offset-md-4">
					<h1 className="title btn-primary">Sign In</h1>
					{errors === 'Username/Password Incorrect' && <div className='alert alert-danger'>{errors}</div>}
					<form onSubmit={this.onSubmit}>
						<div>
							<label>Username</label>
							<input
								value={username}
								onChange={this.onChange}
								type="text"
								name="username"
								className="form-control"
							/>
							{errors === 'Username is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label>Password</label>
							<input
								value={password}
								onChange={this.onChange}
								type="password"
								name="password"
								className="form-control"
							/>
							{errors === 'Password is required' || errors === 'Minimum password length is 5 characters' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<button
								id="signup"
								className="btn btn-primary btn-lg"
								disabled={isLoading}
							>
								Login
							</button>
						</div>
					</form>
				</div>
				<br />
				<br />
			</div>
		);
	}
}

SigninForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default SigninForm;
