import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
import SigninForm from './SigninForm.jsx';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

class Signin extends Component {
	componentWillMount() {
		this.props.loading(false);
	}
	render() {
		const { signinUser, addFlashMessage, isLoading, loading } = this.props;
		return (
			<div>
				<SigninForm
					loading={loading}
					signinUser={signinUser}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
				/>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { signinUser, addFlashMessage, loading })(Signin);
