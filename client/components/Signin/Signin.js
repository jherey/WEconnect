import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
import SigninForm from './SigninForm';

class Signin extends Component {
	render() {
		const { signinUser } = this.props;
		return (
			<div>
				<SigninForm signinUser={signinUser} />
			</div>
		);
	}
};

export default connect(null, { signinUser })(Signin);
