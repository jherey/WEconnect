import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { signupUser, userPicture } from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Signup extends Component {
	render() {
		const { signupUser, addFlashMessage, isLoading, userPicture, uploadProgress } = this.props;
		return (
			<div>
				<SignupForm
					signupUser={signupUser}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
					userPicture={userPicture}
					uploadProgress={uploadProgress}
				/>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
		uploadProgress: state.uploadProgress
	}
}

export default connect(mapStateToProps, { signupUser, addFlashMessage, userPicture })(Signup);
