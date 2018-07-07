import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm.jsx';
import { signupUser, imageUpload } from '../../actions/userActions';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signup
 * @extends {Component}
 */
class Signup extends Component {
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
      errors: [],
      uploading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof SignupForm
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @return {null} null
   * @param {object} nextProps
   * @memberof SignupForm
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser.imageUrl) {
      this.setState({ profilepic: nextProps.authUser.imageUrl });
    }
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof SignupForm
*/
  uploadImage(event) {
    this.setState({ profilepic: '', uploading: true });
    const image = event.target.files[0];
    this.props.imageUpload(image).then(() => {
      this.setState({ uploading: false });
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
    this.props.signupUser(this.state).then(() => {
      const { authUser } = this.props;
      const { username } = this.state;
      if (authUser.isAuthenticated) {
        toastr.success(`Welcome ${username}! Signed up successfully!`);
        this.context.router.history.push('/dashboard');
      } else {
        authUser.errors.map(err => toastr.error(err));
      }
    });
  }

  /**
   * @memberof Signup
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
				<SignupForm
          authUser={this.props.authUser}
          uploadImage={this.uploadImage}
          formDetails={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};

Signup.propTypes = {
  authUser: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func,
  imageUpload: PropTypes.func
};

export default connect(mapStateToProps, { signupUser, imageUpload })(Signup);
