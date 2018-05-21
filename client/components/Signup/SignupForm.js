import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import Spinner from '../Spinner';

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

	fileChange(e) {
		this.setState({ profilepic: '' });
		const uploadTask = storage.child(`userimage/${new Date().getTime()}`)
			.put(e.target.files[0]);
		uploadTask.on('state_changed', snapshot => {
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			this.props.setProgress(progress);
		}, error => {
			this.setState({ errors: err.message })
		}, () => {
			this.setState({ profilepic: uploadTask.snapshot.downloadURL });
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '' });
		this.props.signupUser(this.state)
			.then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Welcome! You signed up successfully!'
					})
					this.context.router.history.push('/dashboard');
				},
				(err) => {
					this.props.loading(false);
					this.setState({ errors: err.response.data.message });
				}
			);
	}

	render() {
		const { errors, firstname, lastname, username, email, password, confirmPassword, sex } = this.state;
		const { isLoading, uploadProgress } = this.props;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="form-signup">
				<div className="signup-form container py-5">
					<h1 className="text-center" style={{'color': 'white'}}>Sign Up</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							{errors === 'Username already exists' && <div className='alert alert-danger'>{errors}</div>}
							{errors === 'Email address taken' && <div className='alert alert-danger'>{errors}</div>}
							<form onSubmit={this.onSubmit}>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>First Name</label>
										<input
											value={firstname}
											onChange={this.onChange}
											type="text"
											name="firstname"
											className="form-control"
										/>
										{errors === 'Firstname is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
										<label>Last Name</label>
										<input
											value={lastname}
											onChange={this.onChange}
											type="text"
											name="lastname"
											className="form-control"
										/>
										{errors === 'Lastname is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
									<label className='control-label'>Username</label>
									<input
										value={username}
										onChange={this.onChange}
										type="text"
										name="username"
										className="form-control"
									/>
									{errors === 'Username is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
										<label className='control-label'>Email</label>
										<input
											value={email}
											onChange={this.onChange}
											type="email"
											name="email"
											className="form-control"
										/>
										{errors === 'Email is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label className='control-label'>Password</label>
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
									<div className="col-sm-6">
										<label className='control-label'>Confirm Password</label>
										<input
											value={confirmPassword}
											onChange={this.onChange}
											type="password"
											name="confirmPassword"
											className="form-control"
										/>
										{errors === 'Confirm password field is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
									<label className='control-label'>Sex</label>
									<select
										className='form-control'
										name='sex'
										onChange={this.onChange}
										value={sex}
									>
										<option value='' disabled>Choose</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
									</select>
									{errors === 'Sex is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
									<label className='control-label'>Profile Picture</label><br/>
									<input
										type="file"
										onChange={this.fileChange.bind(this)}
									/>
									<progress value={uploadProgress} max="100" />
									</div>
								</div>
								<button
									id="submitButton"
									disabled={isLoading}
									className="btn btn-orange btn-lg"
								>
									Sign Up
								</button>
								<p id="signup-link">Already have an account?<span><Link to="/signin"> Sign In</Link></span></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SignupForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default SignupForm;