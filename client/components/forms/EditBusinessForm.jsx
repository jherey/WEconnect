import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Form to edit a business
const EditBusinessForm = ({
  id, authUser, uploadImage, onChange, onSubmit, formDetails
}) => {
  // Destructure form details
  const {
    businessName, email, category, location, address, businessInfo, website, uploading
  } = formDetails;

  return (
		<div className="form-signup">
			<div className="signup-form container py-5">
				<h1 className="text-center" style={{ color: 'white' }}>Edit Business Details</h1>
				<div className="row">
					<div className="col-md-10 mx-auto">
						{/* Submit form */}
						<form onSubmit={onSubmit}>
							<div className="form-group row">
								<div className="col-sm-6">
									<label>Business Name</label>
									<input
										type="text"
										value={businessName}
										onChange={onChange}
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
										onChange={onChange}
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
										onChange={onChange}
										name="website"
									/>
								</div>
								<div className="col-sm-6">
									<label>Email</label>
									<input
										type="email"
										className="form-control"
										value={email}
										onChange={onChange}
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
										onChange={onChange}
										value={category}
									>
										<option value='' disabled>Select category</option>
										<option value='technology'>Technology</option>
										<option value='news'>News</option>
										<option value='fashion'>Fashion</option>
										<option value='transport'>Transport</option>
										<option value='entertainment'>Entertainment</option>
										<option value='construction'>Construction</option>
										<option value='advertising'>Advertising</option>
										<option value='others'>Others</option>
									</select>
								</div>
								<div className="col-sm-6">
									<label className='control-label'>Address</label>
									<input
										type="text"
										className="form-control"
										value={address}
										onChange={onChange}
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
										onChange={onChange}
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
										onChange={uploadImage}
									/>
									{
										uploading ?
										<div style={{ color: 'white' }}>Uploading...</div>
										: null
									}
								</div>
							</div>
							<div style={{ textAlign: 'center' }}>
								<button
									disabled={authUser.isLoading || uploading}
									id="signup"
									className="btn btn-orange btn-lg mr-2"
								>
									{
										authUser.isLoading ?
										<span>processing <i className="fa fa-spinner fa-spin"/></span>
										: <span>Update</span>
									}
								</button>
								{/* Go to business profile page on cancel */}
								<Link to={`/${id}`} className="btn btn-primary btn-lg"> Cancel</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  );
};

EditBusinessForm.contextTypes = {
  router: PropTypes.object.isRequired
};

// Edit business proptypes
EditBusinessForm.propTypes = {
  currentBusiness: PropTypes.object,
  updateBusiness: PropTypes.func.isRequired,
  id: PropTypes.string,
  imageUpload: PropTypes.func,
  authUser: PropTypes.object.isRequired,
  formDetails: PropTypes.object.isRequired,
  uploadImage: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default EditBusinessForm;
