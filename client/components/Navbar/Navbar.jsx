import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarComponent from './NavbarComponent.jsx';
import loading from '../../actions/loading';
import { signout } from '../../actions/userActions';
import { search } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Navbar component
 * @export {Object}
 * @class  Navbar
 * @extends {Component}
 */
class Navbar extends Component {
	 /**
* @returns {null} null
* @param {event} event
* @memberof Navbar
*/
  signout(event) {
    event.preventDefault();
    this.props.signout();
  }

  /**
   * @memberof Navbar
   * @return {ReactElement} markup
   */
  render() {
    const {
      authUser, signout, search, isLoading, loading, addFlashMessage
    } = this.props;
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

const mapStateToProps = state => ({
  authUser: state.authUser,
  isLoading: state.isLoading
});

Navbar.propTypes = {
  signout: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  search: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  signout, search, loading, addFlashMessage
})(Navbar);
