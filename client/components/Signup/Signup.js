import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { signupUser } from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Signup extends Component {
	render() {
		const { signupUser, addFlashMessage } = this.props;
		return (
			<div>
				<SignupForm signupUser={signupUser} addFlashMessage={addFlashMessage} />
			</div>
		);
	}
};

export default connect(null, { signupUser, addFlashMessage })(Signup);
