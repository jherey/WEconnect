import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import { signupUser } from '../../actions/userActions';
import { setProgress } from '../../actions/businessActions';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * @memberof Signup
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
				<SignupForm
					loading={this.props.loading}
					signupUser={this.props.signupUser}
					addFlashMessage={this.props.addFlashMessage}
					isLoading={this.props.isLoading}
					setProgress={this.props.setProgress}
					uploadProgress={this.props.uploadProgress}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  uploadProgress: state.uploadProgress
});

Signup.propTypes = {
  loading: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number,
  setProgress: PropTypes.func,
  isLoading: PropTypes.bool,
  signupUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  signupUser, addFlashMessage, setProgress, loading
})(Signup);
