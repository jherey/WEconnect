import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/index.jsx';

/**
 * @description Signin form component
 * @export {Object}
 * @class  SigninForm
 * @extends {Component}
 */
class SigninForm extends Component {
  /**
* @description Creates an instance of signin form
* @param {object} props
* @memberof SigninForm
*/
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @description Checks loading state
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.isLoading(false);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof SigninForm
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description submits form
 * @param {event} event
 * @returns {null} null
 * @memberof SigninForm
 */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: [] });
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
          this.props.isLoading(false);
          this.setState({ errors: err.response.data.errors });
          if (this.state.errors) {
            this.state.errors.map(err => this.props.addFlashMessage({
              type: 'error',
              text: err
            }));
          }
        }
      );
  }

  /**
   * @memberof SigninForm
   * @return {ReactElement} markup
   */
  render() {
    const { username, password } = this.state;
    const { loading } = this.props;

    return (
			<div className="form-signin">
				<div className="login-form container py-5">
					<h1 className="text-center" style={{ color: 'white' }}>Sign In</h1>
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
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-12">
                    {loading
                      ? <Spinner />
                      : <button
                          id="signup"
                          className="btn btn-orange btn-lg"
                          disabled={loading}
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
  }
}

SigninForm.contextTypes = {
  router: PropTypes.object.isRequired
};

SigninForm.propTypes = {
  signinUser: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isLoading: PropTypes.func.isRequired,

};

export default SigninForm;
