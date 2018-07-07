import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner/index.jsx';

const SignupForm = (props) => {
  const {
    firstname, lastname, username, email, password, confirmPassword, sex, uploading
  } = props.formDetails;
  const {
    authUser, uploadImage, onChange, onSubmit
  } = props;

  return (
		<div className="form-signup">
			<div className="signup-form container py-5">
				<h1 className="text-center" style={{ color: 'white' }}>Sign Up</h1>
				<div className="row">
					<div className="col-md-10 mx-auto">
						<form onSubmit={onSubmit}>
							<div className="form-group row">
								<div className="col-sm-6">
									<label>First Name</label>
									<input
										value={firstname}
										onChange={onChange}
										type="text"
										name="firstname"
										className="form-control"
									/>
								</div>
								<div className="col-sm-6">
									<label>Last Name</label>
									<input
										value={lastname}
										onChange={onChange}
										type="text"
										name="lastname"
										className="form-control"
									/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-6">
									<label className='control-label'>Username</label>
									<input
										value={username}
										onChange={onChange}
										type="text"
										name="username"
										className="form-control"
									/>
								</div>
								<div className="col-sm-6">
									<label className='control-label'>Email</label>
									<input
										value={email}
										onChange={onChange}
										type="email"
										name="email"
										className="form-control"
									/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-6">
									<label className='control-label'>Password</label>
									<input
										value={password}
										onChange={onChange}
										type="password"
										name="password"
										className="form-control"
									/>
								</div>
								<div className="col-sm-6">
									<label className='control-label'>Confirm Password</label>
									<input
										value={confirmPassword}
										onChange={onChange}
										type="password"
										name="confirmPassword"
										className="form-control"
									/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-6">
									<label className='control-label'>Sex</label>
									<select
										className='form-control'
										name='sex'
										onChange={onChange}
										value={sex}
									>
										<option value='' disabled>Choose</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
									</select>
								</div>
								<div className="col-sm-6">
									<label className='control-label'>Profile Picture</label><br/>
									<input
										type="file"
										onChange={uploadImage}
									/>
									{
										uploading ?
										<div style={{ color: 'white' }}>Uploading...</div>
										: null
									}
								</div>
							</div>
							{authUser.isLoading
								? <div style={{ textAlign: 'center' }}>
										<Spinner />
									</div>
								: <button
										id="submitButton"
										className="btn btn-orange btn-lg"
										disabled={uploading}
									>
										Sign Up
									</button>
							}
							<p id="signup-link">Already have an account?<span><Link to="/signin"> Sign In</Link></span></p>
						</form>
					</div>
				</div>
			</div>
		</div>
  );
};

SignupForm.propTypes = {
  authUser: PropTypes.object,
  formDetails: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignupForm;
