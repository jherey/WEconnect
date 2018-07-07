import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner/index.jsx';

const SigninForm = (props) => {
  const { username, password } = props.formDetails;
  const { authUser, onChange, onSubmit } = props;

  return (
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
								<div className="form-group row">
									<div className="col-sm-12">
                    {authUser.isLoading
                      ? <Spinner />
                      : <button
                          id="signup"
                          className="btn btn-orange btn-lg"
                        >
                          Login
                        </button>}
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

SigninForm.propTypes = {
  authUser: PropTypes.object,
  formDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SigninForm;
