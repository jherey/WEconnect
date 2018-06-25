import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarComponent from './NavbarComponent.jsx';
// import loading from '../../actions/loading';
import { signout, isLoading } from '../../actions/userActions';
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
    const { authUser } = this.props;
    return (
			<NavbarComponent
				// loading={this.props.loading}
				authUser={authUser}
				signout={this.props.signout}
				search={this.props.search}
				isLoading={isLoading}
				addFlashMessage={this.props.addFlashMessage}
			/>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser,
  isLoading: state.authUser.isLoading
});

Navbar.propTypes = {
  signout: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.func,
  search: PropTypes.func.isRequired,
  // loading: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  signout, search, isLoading, addFlashMessage
})(Navbar);
