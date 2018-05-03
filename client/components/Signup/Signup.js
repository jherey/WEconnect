import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { signupUser } from '../../actions/userActions';
import { setProgress } from '../../actions/businessActions';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

class Signup extends Component {
	render() {
		const { signupUser, addFlashMessage, isLoading, setProgress, uploadProgress, loading } = this.props;
		return (
			<div>
				<SignupForm
					loading={loading}
					signupUser={signupUser}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
					setProgress={setProgress}
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

export default connect(mapStateToProps, { signupUser, addFlashMessage, setProgress, loading })(Signup);
