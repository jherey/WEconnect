import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinUser, isLoading } from '../../actions/userActions';
import SigninForm from '../forms/SigninForm.jsx';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signin
 * @extends {Component}
 */
class Signin extends Component {
  /**
* @description Creates an instance of signin form
* @param {object} props
* @memberof Signin
*/
  constructor() {
    super();
    // Initial state
    this.state = {
      username: '',
      password: '',
      errors: []
    };
    // Bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @description Creates an instance of signin form
* @returns {null} Loading state
* @memberof Signin
*/
  componentWillMount() {
    this.props.isLoading(false);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof Signin
*/
  onChange(event) {
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @description submits form
* @param {event} event
* @returns {null} null
* @memberof Signin
*/
  onSubmit(event) {
    event.preventDefault();
    // Action to signin a user
    this.props.signinUser(this.state, this.props);
  }

  /**
   * @memberof Signin
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
        {/* Render signin form */}
				<SigninForm
          authUser={this.props.authUser}
          formDetails={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});


Signin.contextTypes = {
  router: PropTypes.object.isRequired
};

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  isLoading: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { signinUser, isLoading })(Signin);
