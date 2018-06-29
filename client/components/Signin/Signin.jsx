import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinUser, isLoading } from '../../actions/userActions';
import SigninForm from './SigninForm.jsx';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signin
 * @extends {Component}
 */
class Signin extends Component {
  /**
   * @memberof Signin
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
				<SigninForm
					loading={this.props.loading}
					signinUser={this.props.signinUser}
					addFlashMessage={this.props.addFlashMessage}
					isLoading={this.props.isLoading}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authUser.isLoading
});

Signin.propTypes = {
  isLoading: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  currentBusiness: PropTypes.object,
  signinUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signinUser, addFlashMessage, isLoading })(Signin);
