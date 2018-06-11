import React, { Component } from 'react';
import NavbarComponent from './NavbarComponent';
import loading from '../../actions/loading';
import { connect } from 'react-redux';
import { signout } from '../../actions/userActions';
import { search } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';

class Navbar extends Component {
	signout(e) {
		e.preventDefault();
		this.props.signout();
	}

	render() {
		const { authUser, signout, search, isLoading, loading, addFlashMessage } = this.props;
		return (
			<NavbarComponent
				loading={loading}
				authUser={authUser}
				signout={signout}
				search={search}
				isLoading={isLoading}
				addFlashMessage={addFlashMessage}
			/>
		);
	}

}

function mapStateToProps(state) {
	return {
		authUser: state.authUser,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { signout, search, loading, addFlashMessage })(Navbar);
