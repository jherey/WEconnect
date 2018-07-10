import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditBusinessForm from '../forms/EditBusinessForm.jsx';
import { updateBusiness, fetchBusiness, imageUpload } from '../../actions/businessActions';

/**
 * @description Edit business component
 * @export {Object}
 * @class  EditBusiness
 * @extends {Component}
 */
class EditBusiness extends Component {
  /**
* @description Creates an instance of edit business form
* @param {object} props
* @memberof EditBusiness
*/
  constructor(props) {
    super(props);
    const {
      id, businessName, email, category, businessInfo, address, location, website, businessImage
    } = this.props.business;
    this.state = {
      id,
      businessName,
      email,
      category,
      businessInfo,
      address,
      location,
      website,
      businessImage,
      errors: [],
      uploading: false
    };
    // Bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @description Fetches all businesses and reviews
* @param {any} props
* @memberof EditBusiness
* @returns {null} null
*/
  componentWillMount() {
    this.props.fetchBusiness(this.props.match.params.id);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof EditBusiness
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof EditBusiness
*/
  uploadImage(event) {
    this.setState({ businessImage: '', uploading: true });
    const image = event.target.files[0];
    // Action to upload an image
    this.props.imageUpload(image).then(() => {
      const { businesses, newBusinessImage } = this.props;
      if (businesses.imageUploadError === '') {
        this.setState({ uploading: false, businessImage: newBusinessImage });
      } else {
        this.setState({ uploading: false });
        toastr.error('Image upload failed, try again!');
      }
    });
  }

  /**
* @description submits form
* @param {event} event
* @returns {null} null
* @memberof EditBusiness
*/
  onSubmit(event) {
    event.preventDefault();
    // Action to update a business
    this.props.updateBusiness(this.state, this.context).then(() => {
      const { businesses, business } = this.props;
      if (businesses.updateSuccess !== '') {
        // Route user to business profile page
        this.context.router.history.push(`/${business.id}`);
      }
    });
  }

  /**
   * @memberof EditBusiness
   * @return {ReactElement} markup
   */
  render() {
    const { authUser, match } = this.props;
    const { id } = match.params;

    return (
			<div>
        {/* Render edit business form */}
        <EditBusinessForm
          id={id}
          authUser={authUser}
          uploadImage={this.uploadImage}
          updateBusiness={this.props.updateBusiness}
          formDetails={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
			</div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.authUser.user.id,
  authUser: state.authUser,
  business: state.businesses.currentBusiness,
  newBusinessImage: state.businesses.imageUrl,
  updateErrors: state.businesses.updateErrors,
  businesses: state.businesses
});

EditBusiness.contextTypes = {
  router: PropTypes.object.isRequired
};


EditBusiness.propTypes = {
  authUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  imageUpload: PropTypes.func,
  fetchBusiness: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  uploadImage: PropTypes.func,
  currentBusiness: PropTypes.object,
  business: PropTypes.object,
  businesses: PropTypes.object,
  updateErrors: PropTypes.array,
  newBusinessImage: PropTypes.string
};

export default connect(mapStateToProps, {
  imageUpload, updateBusiness, fetchBusiness
})(EditBusiness);
