import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchForm from '../forms/SearchForm.jsx';
import { signout } from '../../actions/userActions';
import { search } from '../../actions/businessActions';

// Navbar Component
/**
 * @description Navbar component
 * @export {Object}
 * @class  Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
* @description Creates an instance of Navbar component
* @param {object} props
* @memberof Navbar
*/
  constructor() {
    super();
    // Component state
    this.state = {
      keyword: '',
      type: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NavbarComponent
*/
  onChange(event) {
    // Set states on change
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NavbarComponent
*/
  onSubmit(event) {
    event.preventDefault();
    const { keyword, type } = this.state;
    const { searchBusiness } = this.props;
    // Return toast error if search fields is empty
    if (keyword.trim() === '' || type.trim() === '') {
      return toastr.error('Please type a search query and select a type');
    }
    // Destructure history
    const { history } = this.context.router;
    // Calls the search action
    searchBusiness(keyword, type, 1, history);
  }

  /**
   * @memberof Navbar
   * @return {ReactElement} markup
   */
  render() {
    // Destructure props
    const { authUser, signoutAction } = this.props;

    // Authenticated links
    const authUserLinks = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/businesses">Businesses</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">Dashboard</Link>
				</li>
				<li className="nav-item mr-5">
					<Link className="nav-link" to="/" onClick={signoutAction}>Sign out</Link>
				</li>
			</ul>
    );

    // Guest links
    const guestLinks = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/businesses">Businesses</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>
				<li className="nav-item mr-5">
					<Link className="nav-link" to="/signup">Sign Up</Link>
				</li>
			</ul>
    );

    return (
      <nav className="navbar navbar-custom sticky-top navbar-light navbar-expand-lg">
        <Link className="navbar-brand ml-5" to="/">WeConnect</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" id="hamburger" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              {/* Form to serach for businesses */}
              <SearchForm
                formDetails={this.state}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              />
            </li>
					</ul>
					{authUser.isAuthenticated ? authUserLinks : guestLinks}
				</div>
			</nav>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});


Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

Navbar.propTypes = {
  authUser: PropTypes.object.isRequired,
  searchBusiness: PropTypes.func.isRequired,
  signoutAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  signoutAction: signout, searchBusiness: search
})(Navbar);
