import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
import SigninForm from './SigninForm';
import { addFlashMessage } from '../../actions/flashMessages';

class Signin extends Component {
	render() {
		const { signinUser, addFlashMessage } = this.props;
		return (
			<div>
				<SigninForm signinUser={signinUser} addFlashMessage={addFlashMessage} />
			</div>
		);
	}
};

export default connect(null, { signinUser, addFlashMessage })(Signin);
