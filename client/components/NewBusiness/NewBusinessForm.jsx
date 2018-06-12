import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../firebase';
import Spinner from '../Spinner/index.jsx';

/**
 * @description Create new business form
 * @export {Object}
 * @class  NewBusinessForm
 * @extends {Component}
 */
class NewBusinessForm extends Component {
  /**
* @description Creates an instance of Business Profile Page
* @param {object} props
* @memberof BusinessProfilePage
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
* @memberof NewBusinessForm
*/
  fileChange(event) {
    this.setState({
      businessImage: '',
      uploading: true
    });
    const uploadTask = storage.child(`businessimage/${new Date().getTime()}`)
      .put(event.target.files[0]);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.props.setProgress(progress);
    }, (err) => {
      this.setState({ errors: err.message });
    }, () => {
      this.setState({
        businessImage: uploadTask.snapshot.downloadURL,
        uploading: false
      });
    });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof NewBusinessForm
*/
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    this.props.createBusiness(this.state).then(
      () => {
        this.props.setProgress(0);
        this.props.addFlashMessage({
          type: 'success',
          text: 'Business registered successfully'
        });
        this.context.router.history.push('/');
      },
      (err) => {
        this.props.loading(false);
        this.setState({ error: err.response.data.errors });
        if (this.state.error) {
          this.state.error.map((err) => {
            this.props.addFlashMessage({
              type: 'error',
              text: err
            });
          });
        }
      }
    );
  }

  /**
   * @memberof NewBusinessForm
   * @return {ReactElement} markup
   */
  render() {
    const {
      businessName, email, category, location, address, businessInfo, website, errors, uploading
    } = this.state;
    const { isLoading, uploadProgress } = this.props;

    if (isLoading) { return <Spinner />; }

    return (
			<div className="form-signup">
				<div className="signup-form container py-5">
					<h1 className="text-center" style={{ color: 'white' }}>Register Business</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							{errors === 'Username already exists' && <div className='alert alert-danger'>{errors}</div>}
							{errors === 'Email address taken' && <div className='alert alert-danger'>{errors}</div>}
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
										{errors === 'Business name is required' && <div className='alert alert-danger'>{errors}</div>}
										{errors === 'A business with this name exist' && <div className='alert alert-danger'>{errors}</div>}
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
										{errors === 'Email is required' && <div className='alert alert-danger'>{errors}</div>}
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
										{errors === 'Category is required' && <div className='alert alert-danger'>{errors}</div>}
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
										{errors === 'Location is required' && <div className='alert alert-danger'>{errors}</div>}
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
								<button
									id="submitButton"
									disabled={uploading}
									className="btn btn-orange btn-lg"
								>
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

NewBusinessForm.contextTypes = {
  router: PropTypes.object.isRequired
};

NewBusinessForm.propTypes = {
  createBusiness: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number,
  isLoading: PropTypes.bool,
  currentBusiness: PropTypes.object,
  setProgress: PropTypes.func,
};

export default NewBusinessForm;
