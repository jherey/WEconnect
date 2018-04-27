import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { signupUser } from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Signup extends Component {
	render() {
		const { signupUser, addFlashMessage, isLoading } = this.props;
		return (
			<div>
				<SignupForm signupUser={signupUser} addFlashMessage={addFlashMessage} isLoading={isLoading} />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { signupUser, addFlashMessage })(Signup);
