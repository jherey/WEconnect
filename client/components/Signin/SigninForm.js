import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Materialize from 'materialize-css';
import Spinner from '../Spinner';

class SigninForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errors: ''
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
					this.context.router.history.push('/');
				},
				(err) => {
					this.props.loading(false);
					this.setState({ errors: err.response.data.message });
				}
			);
	}

	render() {
		const { username, password, errors } = this.state;
		const { isLoading } = this.props;

		if(isLoading) { return <Spinner />; }

		return (
			<div className="signup">
				<div className="login-form col-md-4 offset-md-4">
					<h1 className="title">Sign In</h1>
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
							{errors === 'Username is required' && <div className='alert alert-danger'>{errors}</div>}
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
							{errors === 'Password is required' && <div className='alert alert-danger'>{errors}</div>}
							{errors === 'Minimum password length is 5 characters' && <div className='alert alert-danger'>{errors}</div>}
						</div>
						<div>
							<button
								id="signup"
								className="btn btn-orange btn-lg"
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
