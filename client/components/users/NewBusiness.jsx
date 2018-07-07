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
* @memberof NewBusinessForm
*/
  constructor() {
    super();
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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusinessForm
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof EditBusinessForm
*/
  uploadImage(event) {
    this.setState({ businessImage: '', uploading: true });
    const image = event.target.files[0];
    this.props.imageUpload(image).then(() => {
      this.setState({ uploading: false, businessImage: this.props.newBusinessImage });
    });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusinessForm
*/
  onSubmit(event) {
    event.preventDefault();
    this.props.createBusiness(this.state).then(() => {
      const { createBusinessSuccess, createBusinessErrors } = this.props;
      if (createBusinessSuccess.id) {
        toastr.success('Business registered successfully');
        this.context.router.history.push(`${this.props.newBusinessId}`);
      } else {
        createBusinessErrors.map(err => toastr.error(err));
      }
    });
  }

  /**
	* @memberof NewBusiness
	* @return {ReactElement} markup
	*/
  render() {
    const { authUser } = this.props;

    return (
			<div>
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
  newBusinessImage: state.businesses.imageUrl,
  newBusinessId: state.businesses.currentBusiness.id,
  createBusinessSuccess: state.businesses.currentBusiness,
  createBusinessErrors: state.businesses.createBusinessErrors
});

NewBusiness.contextTypes = {
  router: PropTypes.object.isRequired
};

NewBusiness.propTypes = {
  createBusiness: PropTypes.func,
  imageUpload: PropTypes.func,
  authUser: PropTypes.object.isRequired,
  createBusinessSuccess: PropTypes.object,
  createBusinessErrors: PropTypes.array,
  newBusinessId: PropTypes.number,
  newBusinessImage: PropTypes.string
};

export default connect(mapStateToProps, {
  createBusiness, imageUpload
})(NewBusiness);
