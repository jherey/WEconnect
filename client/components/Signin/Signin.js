import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
import SigninForm from './SigninForm';
import { addFlashMessage } from '../../actions/flashMessages';

class Signin extends Component {
	render() {
		const { signinUser, addFlashMessage, isLoading } = this.props;
		return (
			<div>
				<SigninForm signinUser={signinUser} addFlashMessage={addFlashMessage} isLoading={isLoading} />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { signinUser, addFlashMessage })(Signin);
