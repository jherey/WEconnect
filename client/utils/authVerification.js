import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signout, isLoading } from '../actions/userActions';
import addFlashMessage from '../actions/flashMessages';
import decodeToken from './decodeToken';
// import isLoading from '../actions/userActions';

export default function(AuthenticatedComponent) {
	class AuthVerification extends Component {
		componentWillMount() {
			if(!this.props.isAuthenticated) {
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

		render() {
			return (
				<AuthenticatedComponent {...this.props} />
			);
		}
	}

	AuthVerification.contextTypes = {
		router: PropTypes.object.isRequired
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.authUser.isAuthenticated
		};
	}

	return connect(mapStateToProps, { addFlashMessage, signout, isLoading })(AuthVerification);
}
