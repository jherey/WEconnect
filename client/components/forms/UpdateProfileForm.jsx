import React from 'react';
import PropTypes from 'prop-types';

const UpdateProfileForm = ({
  // Destructure props
  authUser, uploadImage, onChange, onSubmit, formDetails
}) => {
  // Destructure form details
  const {
    firstname, lastname, username, email, sex, uploading
  } = formDetails;

  return (
    // Return form
    <div className="modal fade" id="editUserModal" tabIndex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content userDetails">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit User Profile</h5>
              <button id="hidePopUpBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-6">
                  <label>First Name</label>
                  <input
                    value={firstname}
                    onChange={onChange}
                    type="text"
                    name="firstname"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-6">
                  <label>Last Name</label>
                  <input
                    value={lastname}
                    onChange={onChange}
                    type="text"
                    name="lastname"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                <label className='control-label'>Username</label>
                <input
                  value={username}
                  onChange={onChange}
                  type="text"
                  name="username"
                  className="form-control"
                />
                </div>
                <div className="col-sm-6">
                  <label className='control-label'>Email</label>
                  <input
                    value={email}
                    onChange={onChange}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                <label className='control-label'>Sex</label>
                <select
                  className='form-control'
                  name='sex'
                  onChange={onChange}
                  value={sex}
                >
                  <option value='' disabled>Choose</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
                </div>
                <div className="col-sm-6">
                  <label className='control-label'>Profile Picture</label><br/>
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
              {/* Submit button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  disabled={authUser.isLoading || uploading}
                  id="signup"
                  className="btn btn-orange btn-lg editProfile"
                >
                  {
                    authUser.isLoading ?
                    <span>processing <i className="fa fa-spinner fa-spin"/></span>
                    : <span>Update Profile</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

// Prop types for update profile form
UpdateProfileForm.propTypes = {
  authUser: PropTypes.object,
  formDetails: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default UpdateProfileForm;
