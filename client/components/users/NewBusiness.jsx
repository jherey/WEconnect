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
export class NewBusiness extends Component {
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
    const { imageUploadAction } = this.props;
    // Action to upload an image
    imageUploadAction(image).then(() => {
      const { newBusinessImage } = this.props;
      this.setState({ uploading: false, businessImage: newBusinessImage });
    });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusiness
*/
  onSubmit(event) {
    event.preventDefault();
    const { createBusinessAction } = this.props;
    // Action to register a new business
    createBusinessAction(this.state, this.props);
  }

  /**
	* @memberof NewBusiness
	* @return {ReactElement} markup
	*/
  render() {
    const { authUser, createBusinessAction } = this.props;

    return (
			<div>
        {/* Render new business form */}
				<NewBusinessForm
          authUser={authUser}
          formDetails={this.state}
          uploadImage={this.uploadImage}
          createBusiness={createBusinessAction}
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
  createBusinessAction: PropTypes.func,
  imageUploadAction: PropTypes.func,
  authUser: PropTypes.object.isRequired,
  newBusinessImage: PropTypes.string
};

export default connect(mapStateToProps, {
  createBusinessAction: createBusiness,
  imageUploadAction: imageUpload
})(NewBusiness);
