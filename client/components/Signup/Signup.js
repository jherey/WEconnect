import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { signupUser } from '../../actions/userActions';

class Signup extends Component {
	render() {
		const {signupUser } = this.props;
		const { context } = this.props;
		return (
			<div>
				<SignupForm signupUser={signupUser} />
			</div>
		);
	}
};

export default connect(null, { signupUser })(Signup);
