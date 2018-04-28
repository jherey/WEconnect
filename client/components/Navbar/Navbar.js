import React, { Component } from 'react';
import NavbarComponent from './NavbarComponent';
import { connect } from 'react-redux';
import { signout } from '../../actions/userActions';
import { search } from '../../actions/businessActions';

class Navbar extends Component {
	signout(e) {
		e.preventDefault();
		this.props.signout();
	}

	render() {
		const { authUser, signout, search, isLoading } = this.props;
		return (
			<NavbarComponent authUser={authUser} signout={signout} search={search} isLoading={isLoading} />
		);
	}

}

function mapStateToProps(state) {
	return {
		authUser: state.authUser,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { signout, search })(Navbar);
