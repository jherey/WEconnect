import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

// User profile component
const UserProfile = ({ currentUser, image }) => (
  <div className="row col-lg-8 offset-lg-4 col-md-10 offset-md-2 user-profile">
    <div className="col-lg-4 col-md-5 userImage">
      {/* User's image */}
      <img
        className="mt-2 user"
        src={image}
        alt="UserImage"
        border-radius= '50%'
        style={{ width: '200px', height: '200px' }}
      />
      {/* Display when user joined the application */}
      <p id="user-profile-info">Joined {moment(currentUser.createdAt).format('Do MMMM YYYY')}</p>
    </div><br />
    <div className="text-center col-lg-4 col-md-5" id="user-profile-info">
      {/* Display user's name */}
      <p className="textcase">{currentUser.firstname} {currentUser.lastname}</p>
      {/* Display user's email */}
      <p>{currentUser.email}</p>
      {/* Link ti register a new Business */}
      <Link className="btn btn-primary" to="/register">Register a Business</Link> <br /><br />
      {/* Button to edit user profile */}
      <button id="editProfile" className="btn btn-primary" data-toggle="modal" data-target="#editUserModal">
        Edit Profile
      </button>
    </div>
  </div>
);

// Prop types for user profile component
UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired
};

export default UserProfile;
