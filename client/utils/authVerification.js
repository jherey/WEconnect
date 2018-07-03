import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signout, isLoading } from '../actions/userActions';
import addFlashMessage from '../actions/flashMessages';
import decodeToken from './decodeToken';

/**
 * @description Review list component
 * @param {Object} AuthenticatedComponent
 * @return {*} void
 */
export default function (AuthenticatedComponent) {
  /**
 * @description Review list component
 * @export {Object}
 * @class  AuthVerification
 * @extends {Component}
 */
  class AuthVerification extends Component {
    /**
   * @description Fetches all businesses
   * @returns {null} null
   * @memberof AllBusinesses
   */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to signin to access this page'
        });
        this.context.router.history.push('/signin');
      }
      if (!decodeToken()) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Session expired, please signin again'
        });
        this.props.signout();
        this.context.router.history.push('/signin');
      }
    }

    /**
   * @memberof AuthVerification
   * @return {ReactElement} markup
   */
    render() {
      return (
				<AuthenticatedComponent {...this.props} />
      );
    }
  }

  AuthVerification.contextTypes = {
    router: PropTypes.object.isRequired
  };

  AuthVerification.propTypes = {
    signout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.authUser.isAuthenticated
  });

  return connect(mapStateToProps, { addFlashMessage, signout, isLoading })(AuthVerification);
}
