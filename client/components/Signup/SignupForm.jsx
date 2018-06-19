import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import Spinner from '../Spinner/index.jsx';

/**
 * @description Signin form component
 * @export {Object}
 * @class  SignupForm
 * @extends {Component}
 */
class SignupForm extends Component {
/**
* @description Creates an instance of signup form
* @param {object} props
* @memberof SignupForm
*/
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
      error: [],
      uploading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof BusinessProfilePage
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof BusinessProfilePage
*/
  fileChange(event) {
    this.setState({
      profilepic: '',
      uploading: true
    });
    const uploadTask = storage.child(`userimage/${new Date().getTime()}`)
      .put(event.target.files[0]);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.props.setProgress(progress);
    }, (error) => {
      this.setState({ errors: error.message });
    }, () => {
      this.setState({
        profilepic: uploadTask.snapshot.downloadURL,
        uploading: false
      });
    });
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
    this.props.signupUser(this.state)
      .then(
        () => {
          this.props.setProgress(0);
          this.props.addFlashMessage({
            type: 'success',
            text: 'Welcome! You signed up successfully!'
          });
          this.context.router.history.push('/dashboard');
        },
        (err) => {
          this.props.loading(false);
          this.setState({ error: err.response.data.errors });
          if (this.state.error) {
            this.state.error.map(err => this.props.addFlashMessage({
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
    const {
      firstname, lastname, username, email, password, confirmPassword, sex, uploading
    } = this.state;
    const { isLoading, uploadProgress } = this.props;

    if (isLoading) { return <Spinner />; }

    return (
			<div className="form-signup">
				<div className="signup-form container py-5">
					<h1 className="text-center" style={{ color: 'white' }}>Sign Up</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
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
									disabled={uploading}
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
};

SignupForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadProgress: PropTypes.number,
  signupUser: PropTypes.func.isRequired,
  setProgress: PropTypes.func
};

export default SignupForm;
