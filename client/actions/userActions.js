import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  EDIT_USER,
  SET_API_STATUS,
  IMAGE_UPLOAD,
  IMAGE_ERROR_UPLOAD,
  UPDATE_USER_FAILED
} from './types';

require('dotenv').config();

/**
 * @description - Updates loading status
 * @param { Boolean } status
 * @returns { status } - Action
 */
export function isLoading(status) {
  return {
    type: SET_API_STATUS,
    status
  };
}

/**
 * @description - Sets current user in store
 * @param {*} user
 * @returns {Object} user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @description - Sets current user in store
 * @param {*} errors
 * @returns {Object} user
 */
export function authError(errors) {
  return {
    type: AUTH_ERROR,
    errors
  };
}

/**
 * @description - Creates a new user
 * @param {*} userData
 * @param {*} props
 * @returns { user } - Action
 */
export const signupUser = (userData, props) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('/api/v1/auth/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      toastr.success(`Welcome ${userData.username}! Signed up successfully!`);
      props.history.push('/dashboard');
      dispatch(isLoading(false));
    })
    .catch((err) => {
      const { errors } = err.response.data;
      dispatch(authError(errors));
      errors.map(error => toastr.error(error));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Login a user
 * @param {*} userData
 * @param {*} props
 * @returns {Object} loggedin user
 */
export const signinUser = (userData, props) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('/api/v1/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      toastr.success(`Welcome ${userData.username}! Signed in successfully!`);
      props.history.push('/dashboard');
      dispatch(isLoading(false));
    })
    .catch((err) => {
      const { errors } = err.response.data;
      dispatch(authError(errors));
      errors.map(error => toastr.error(error));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Sets one user in store
 * @param {*} url
 * @returns {Object} user
 */
export function userImageUpload(url) {
  return {
    type: IMAGE_UPLOAD,
    url
  };
}

/**
 * @description - Sets one user in store
 * @param {*} error
 * @returns {Object} user
 */
export function userImageUploadError(error) {
  return {
    type: IMAGE_ERROR_UPLOAD,
    error
  };
}

/**
 * @description - Sets one user in store
 * @param {*} image
 * @returns {Object} user
 */
export const imageUpload = image => (dispatch) => {
  const uploadPreset = process.env.UPLOAD_PRESET;
  const cloudinaryApi = process.env.CLOUDINARY_API;
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', uploadPreset);
  delete axios.defaults.headers.common.Authorization;
  return axios.post(cloudinaryApi, data)
    .then((response) => {
      const { token } = localStorage;
      axios.defaults.headers.common.Authorization = token;
      const cloudImageUrl = response.data.secure_url;
      dispatch(userImageUpload(cloudImageUrl));
    })
    .catch(() => {
      dispatch(userImageUploadError('Image upload failed, try again!'));
    });
};


/**
 * @description - Sets one user in store
 * @param {*} user
 * @returns {Object} user
 */
export function editUser(user) {
  return {
    type: EDIT_USER,
    user
  };
}

/**
 * @description - Sets one user in store
 * @param {*} errors
 * @returns {Object} user
 */
export function updateFailed(errors) {
  return {
    type: UPDATE_USER_FAILED,
    errors
  };
}

/**
 * @description - Updates a business
 * @param {*} updatedUserDetails
 * @returns { User } - Action
 */
export const updateUser = updatedUserDetails => (dispatch) => {
  dispatch(isLoading(true));
  return axios.put(`/api/v1/auth/${updatedUserDetails.id}`, updatedUserDetails)
    .then((res) => {
      dispatch(editUser(res.data.updatedUser));
      toastr.success('Update successful!');
      dispatch(isLoading(false));
    })
    .catch((err) => {
      dispatch(updateFailed(err.response.data.errors));
      dispatch(isLoading(false));
      $('#editUserModal').modal();
      err.response.data.errors.map(err => toastr.error(err));
    });
};

/**
 * @description - Removes token from local storage
 * @returns {*} object
 */
export const signout = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken();
  dispatch(setCurrentUser({}));
};
