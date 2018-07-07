import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const UserProfile = ({ currentUser, image }) => (
  <div className="col-lg-3 col-md-6">
    <div className="row userImage">
      <img
        className="mt-2 user"
        src={image}
        alt="UserImage"
        border-radius= '50%'
        style={{ width: '200px', height: '200px' }}
      />
    </div><br />
    <div className="text-center">
      <p>Joined {moment(currentUser.createdAt).format('Do MMMM YYYY')}</p>
      <Link className="btn btn-primary" to="/register">Register a Business</Link> <br /><br />
      <button className="btn btn-primary" data-toggle="modal" data-target="#editUserModal">
        Edit User Details
      </button>
    </div>
  </div>
);

UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired
};

export default UserProfile;
