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
* @memberof EditBusinessForm
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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @description Fetches all businesses and reviews
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.fetchBusiness(this.props.match.params.id);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof EditBusinessForm
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
* @description submits form
* @param {event} event
* @returns {null} null
* @memberof EditBusinessForm
*/
  onSubmit(event) {
    event.preventDefault();
    this.props.updateBusiness(this.state).then(() => {
      const { business, currentBusiness } = this.props;
      if (business.updateSuccess) {
        toastr.success(business.updateSuccess);
        this.context.router.history.push(`/${currentBusiness.id}`);
      } else {
        this.props.updateErrors.map(err => toastr.error(err));
      }
    });
  }

  /**
   * @memberof EditBusiness
   * @return {ReactElement} markup
   */
  render() {
    const { id } = this.props.match.params;
    const { authUser } = this.props;

    return (
			<div>
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
  updateErrors: state.businesses.updateErrors
});

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
