import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signout } from '../actions/userActions';
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
   * @description Higher Order Component
   * @returns {null} Authenticated component
   * @memberof AuthVerification
   */
    componentWillMount() {
      const { history } = this.context.router;
      if (!decodeToken()) {
        toastr.error('Session expired, please signin again');
        this.props.signout();
        history.push('/signin');
      }
      if (!this.props.isAuthenticated) {
        toastr.error('You need to signin to access this page');
        history.push('/signin');
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
    isAuthenticated: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.authUser.isAuthenticated
  });

  return connect(mapStateToProps, { signout })(AuthVerification);
}
