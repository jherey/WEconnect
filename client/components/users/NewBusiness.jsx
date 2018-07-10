import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewBusinessForm from '../forms/NewBusinessForm.jsx';
import { createBusiness, imageUpload } from '../../actions/businessActions';

/**
 * @description Create new business component
 * @export {Object}
 * @class  NewBusiness
 * @extends {Component}
 */
class NewBusiness extends Component {
  /**
* @description Creates an instance of Business Profile Page
* @param {object} props
* @memberof NewBusiness
*/
  constructor() {
    super();
    // Initial state
    this.state = {
      businessName: '',
      email: '',
      category: '',
      businessInfo: '',
      address: '',
      location: '',
      businessImage: '',
      website: '',
      errors: [],
      uploading: false
    };
    // Bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusiness
*/
  onChange(event) {
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusiness
*/
  uploadImage(event) {
    this.setState({ businessImage: '', uploading: true });
    const image = event.target.files[0];
    // Action to upload an image
    this.props.imageUpload(image).then(() => {
      this.setState({ uploading: false, businessImage: this.props.newBusinessImage });
    });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusiness
*/
  onSubmit(event) {
    event.preventDefault();
    // Action to register a new business
    this.props.createBusiness(this.state, this.props);
  }

  /**
	* @memberof NewBusiness
	* @return {ReactElement} markup
	*/
  render() {
    const { authUser } = this.props;

    return (
			<div>
        {/* Render new business form */}
				<NewBusinessForm
          authUser={authUser}
          formDetails={this.state}
          uploadImage={this.uploadImage}
          createBusiness={this.props.createBusiness}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser,
  newBusinessImage: state.businesses.imageUrl
});

NewBusiness.contextTypes = {
  router: PropTypes.object.isRequired
};

NewBusiness.propTypes = {
  createBusiness: PropTypes.func,
  imageUpload: PropTypes.func,
  authUser: PropTypes.object.isRequired,
  newBusinessImage: PropTypes.string
};

export default connect(mapStateToProps, {
  createBusiness, imageUpload
})(NewBusiness);
