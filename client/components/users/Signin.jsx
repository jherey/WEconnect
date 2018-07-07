import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
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
* @memberof SigninForm
*/
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof SigninForm
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @description submits form
* @param {event} event
* @returns {null} null
* @memberof SigninForm
*/
  onSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state).then(() => {
      const { authUser } = this.props;
      if (authUser.isAuthenticated) {
        toastr.success('Signed in successfully');
        this.context.router.history.push('/dashboard');
      } else {
        authUser.errors.map(err => toastr.error(err));
      }
    });
  }

  /**
   * @memberof Signin
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
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
  authUser: PropTypes.object
};

export default connect(mapStateToProps, { signinUser })(Signin);
