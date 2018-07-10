import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SigninForm = ({
  // Destructure props
  authUser, onChange, onSubmit, formDetails
}) => {
  // Destructure form details
  const { username, password } = formDetails;

  return (
			// Return form
			<div className="form-signin">
				<div className="login-form container py-5">
					<h1 className="text-center" style={{ color: 'white' }}>Sign In</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							<form onSubmit={onSubmit}>
								<div className="form-group row">
									<div className="col-sm-12">
										<label>Username</label>
										<input
											value={username}
											onChange={onChange}
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
											onChange={onChange}
											type="password"
											name="password"
											className="form-control"
										/>
									</div>
								</div>
								{/* Submit button */}
								<div className="form-group row">
									<div className="col-sm-12">
                    <button
											disabled={authUser.isLoading}
											id="signup"
											className="btn btn-orange btn-lg"
										>
											{
												authUser.isLoading ?
												<span>processing <i className="fa fa-spinner fa-spin"/></span>
												: <span>Login</span>
											}
										</button>
										{/* Link to signup page */}
										<p id="signin-link">Do not have an account?<span><Link to="/signup"> Sign Up</Link></span></p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
  );
};

// Proptypes for signin form
SigninForm.propTypes = {
  authUser: PropTypes.object,
  formDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SigninForm;
