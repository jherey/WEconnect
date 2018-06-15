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
    const {
      signupUser, addFlashMessage, isLoading, setProgress, uploadProgress, loading
    } = this.props;
    return (
			<div>
				<SignupForm
					loading={loading}
					signupUser={signupUser}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
					setProgress={setProgress}
					uploadProgress={uploadProgress}
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
