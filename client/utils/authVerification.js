import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

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
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.context.router.history.push('/');
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

	return connect(mapStateToProps, { addFlashMessage })(AuthVerification);
}
