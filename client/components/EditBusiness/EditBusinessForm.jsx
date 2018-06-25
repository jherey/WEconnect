import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../firebase';
import Spinner from '../Spinner/index.jsx';

/**
 * @description Edit business form component
 * @export {Object}
 * @class  EditBusinessForm
 * @extends {Component}
 */
class EditBusinessForm extends Component {
  /**
* @description Creates an instance of edit business form
* @param {object} props
* @memberof EditBusinessForm
*/
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentBusiness.id,
      businessName: this.props.currentBusiness.businessName,
      email: this.props.currentBusiness.email,
      category: this.props.currentBusiness.category,
      businessInfo: this.props.currentBusiness.businessInfo,
      address: this.props.currentBusiness.address,
      location: this.props.currentBusiness.location,
      website: this.props.currentBusiness.website,
      businessImage: this.props.currentBusiness.businessImage,
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  fileChange(event) {
    this.setState({ businessImage: '' });
    const uploadTask = storage.child(`businessimage/${new Date().getTime()}`)
      .put(event.target.files[0]);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.props.setProgress(progress);
    }, (error) => {
      this.setState({ errors: error.message });
    }, () => {
      this.setState({ businessImage: uploadTask.snapshot.downloadURL });
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
    this.setState({ errors: [] });
    this.props.updateBusiness(this.state)
      .then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Business updated successfully'
          });
          this.context.router.history.push(`/${this.props.currentBusiness.id}`);
        },
        (err) => {
          this.props.isLoading(false);
          this.setState({ errors: err.response.data.errors });
          if (this.state.errors) {
            this.state.errors.map(err => this.props.addFlashMessage({
              type: 'error',
              text: err
            }));
          }
        }
      );
  }

  /**
   * @memberof EditBusinessForm
   * @return {ReactElement} markup
   */
  render() {
    const { loading, uploadProgress } = this.props;
    const {
      businessName, email, category, location, address, businessInfo, website, errors
    } = this.state;

    return (
			<div className="form-signup">
				<div className="signup-form container py-5">
					<h1 className="text-center" style={{ color: 'white' }}>Edit Business Details</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							<form onSubmit={this.onSubmit}>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Business Name</label>
										<input
											type="text"
											value={businessName}
											onChange={this.onChange}
											className="form-control"
											name="businessName"
										/>
									</div>
									<div className="col-sm-6">
										<label>Description</label>
										<textarea
											className="form-control"
											rows="3"
											name="businessInfo"
											value={businessInfo}
											onChange={this.onChange}
										>
										</textarea>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Website</label>
										<input
											type="text"
											className="form-control"
											value={website}
											onChange={this.onChange}
											name="website"
										/>
									</div>
									<div className="col-sm-6">
										<label>Email</label>
										<input
											type="email"
											className="form-control"
											value={email}
											onChange={this.onChange}
											name="email"
										/>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Category</label>
										<select
											className="form-control"
											name='category'
											onChange={this.onChange}
											value={category}
										>
											<option value='' disabled>Select category</option>
											<option value='technology'>Technology</option>
											<option value='news'>News</option>
											<option value='fashion'>Fashion</option>
											<option value='transport'>Transport</option>
											<option value='entertainment'>Entertainment</option>
											<option value='others'>Others</option>
										</select>
									</div>
									<div className="col-sm-6">
										<label className='control-label'>Address</label>
										<input
											type="text"
											className="form-control"
											value={address}
											onChange={this.onChange}
											name="address"
										/>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label className='control-label'>Country</label>
										<select
											className="form-control"
											name='location'
											onChange={this.onChange}
											value={location}
										>
											<option value='' disabled>Choose your country</option>
											<option value='nigeria'>Nigeria</option>
											<option value='uganda'>Uganda</option>
											<option value='kenya'>Kenya</option>
											<option value='ghana'>Ghana</option>
										</select>
									</div>
									<div className="col-sm-6">
										<label className='control-label'>Company Logo</label>
										<input
											type="file"
											onChange={this.fileChange.bind(this)}
										/>
										<progress value={uploadProgress} max="100" />
									</div>
								</div>
								{loading
									? <div style={{ textAlign: 'center' }}>
											<Spinner />
										</div>
									: <button
											id="submitButton"
											className="btn btn-orange btn-lg"
											disabled={loading}
										>
											Update
										</button>
								}
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

EditBusinessForm.contextTypes = {
  router: PropTypes.object.isRequired
};

EditBusinessForm.propTypes = {
  currentBusiness: PropTypes.object.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  uploadProgress: PropTypes.number,
  setProgress: PropTypes.func
};

export default EditBusinessForm;
