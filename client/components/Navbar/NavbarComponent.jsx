import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description Navbar component
 * @export {Object}
 * @class  NavbarComponent
 * @extends {Component}
 */
class NavbarComponent extends Component {
  /**
* @description Creates an instance of Navbar component page
* @param {object} props
* @memberof NavbarComponent
*/
  constructor() {
    super();
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
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NavbarComponent
*/
  onSubmit(event) {
    event.preventDefault();
    if (this.state.keyword.trim() === '' || this.state.type.trim() === '') {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'Please type a search query and select a type'
      });
    }
    this.props.search(this.state.keyword, this.state.type, 1).then(
      () => {
        this.context.router.history.push('/search');
      },
      (err) => {
        this.props.isLoading(false);
        this.props.addFlashMessage({
          type: 'error',
          text: err.response.data.message
        });
      }
    );
  }

  /**
   * @memberof NavbarComponent
   * @return {ReactElement} markup
   */
  render() {
    const { isAuthenticated } = this.props.authUser;

    const authUserLinks = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/businesses">Businesses</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">Dashboard</Link>
				</li>
				<li className="nav-item mr-5">
					<Link className="nav-link" to="/" onClick={this.props.signout}>Sign out</Link>
				</li>
			</ul>
    );

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
							<form onSubmit={this.onSubmit}>
								<div className="form-group mr-3" id="content">
									<input
										value={this.state.keyword}
										onChange={this.onChange}
										name="keyword"
										type="text"
										size="40"
										className="form-control"
										placeholder="I am looking for..."
									/>
									<select
										className='form-control'
										name='type'
										onChange={this.onChange}
										value={this.state.type}
									>
										<option value='' disabled>by name, location or category</option>
										<option value='name'>Name</option>
										<option value='location'>Location</option>
										<option value='category'>Category</option>
									</select>
									<button type="submit" id="search" className="btn button">Search</button>
								</div>
							</form>
						</li>
					</ul>
					{isAuthenticated ? authUserLinks : guestLinks}
				</div>
			</nav>
    );
  }
}

NavbarComponent.contextTypes = {
  router: PropTypes.object.isRequired
};

NavbarComponent.propTypes = {
  search: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  signout: PropTypes.func,
  isLoading: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authUser: PropTypes.object
};

export default NavbarComponent;
