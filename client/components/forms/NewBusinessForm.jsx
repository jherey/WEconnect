import React from 'react';
import PropTypes from 'prop-types';

// Form to register a new business
const NewBusinessForm = ({
  // Destructure props
  authUser, uploadImage, onChange, onSubmit, formDetails
}) => {
  // Destructure form details
  const {
    businessName, email, category, location, address, businessInfo, website, uploading
  } = formDetails;

  return (
		// Return form
		<div className="form-signup">
			<div className="signup-form container py-5">
				<h1 className="text-center" style={{ color: 'white' }}>Register Business</h1>
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
										<option value='advertising'>Advertising</option>
										<option value='construction'>Construction</option>
										<option value='entertainment'>Entertainment</option>
										<option value='fashion'>Fashion</option>
										<option value='news'>News</option>
										<option value='others'>Others</option>
										<option value='technology'>Technology</option>
										<option value='transport'>Transport</option>
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
										<option value='Abia'>Abia</option>
										<option value='Adamawa'>Adamawa</option>
										<option value='Akwa ibom'>Akwa ibom</option>
										<option value='Anambra'>Anambra</option>
										<option value='Bauchi'>Bauchi</option>
										<option value='Bayelsa'>Bayelsa</option>
										<option value='Benue'>Benue</option>
										<option value='Borno'>Borno</option>
										<option value='Cross river'>Cross river</option>
										<option value='Delta'>Delta</option>
										<option value='Ebonyi'>Ebonyi</option>
										<option value='Enugu'>Enugu</option>
										<option value='Enugu'>Enugu</option>
										<option value='Edo'>Edo</option>
										<option value='Ekiti'>Ekiti</option>
										<option value='FCT'>FCT</option>
										<option value='Gombe'>Gombe</option>
										<option value='Imo'>Imo</option>
										<option value='Jigawa'>Jigawa</option>
										<option value='Kaduna'>Kaduna</option>
										<option value='Kano'>Kano</option>
										<option value='Katsina'>Katsina</option>
										<option value='Kebbi'>Kebbi</option>
										<option value='Kogi'>Kogi</option>
										<option value='Kwara'>Kwara</option>
										<option value='Lagos'>Lagos</option>
										<option value='Nasarawa'>Nasarawa</option>
										<option value='Niger'>Niger</option>
										<option value='Ogun'>Ogun</option>
										<option value='Ondo'>Ondo</option>
										<option value='Osun'>Osun</option>
										<option value='Oyo'>Oyo</option>
										<option value='Plateau'>Plateau</option>
										<option value='Rivers'>Rivers</option>
										<option value='Sokoto'>Sokoto</option>
										<option value='Taraba'>Taraba</option>
										<option value='Yobe'>Yobe</option>
										<option value='Zamfara'>Zamfara</option>
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
									className="btn btn-orange btn-lg"
								>
									{
										authUser.isLoading ?
										<span>processing <i className="fa fa-spinner fa-spin"/></span>
										: <span>Register</span>
									}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  );
};

// New business form prop types
NewBusinessForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  uploadImage: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  authUser: PropTypes.object.isRequired
};

export default NewBusinessForm;
