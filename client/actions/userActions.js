import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER, EDIT_USER, SET_API_STATUS } from './types';


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
 * @description - Creates a new user
 * @param {*} userData
 * @returns { user } - Action
 */
export const signupUser = userData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('api/v1/auth/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Login a user
 * @param {*} userData
 * @returns {Object} loggedin user
 */
export const signinUser = userData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('api/v1/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch(isLoading(false));
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
 * @description - Get one user
 * @param {*} id
 * @returns {Object} Found user
 */
export const getOneUser = id => dispatch => axios.get(`api/v1/auth/${id}`)
  .then((res) => {
    dispatch(editUser(res.data.userData));
  });

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
      dispatch(isLoading(false));
    });
};

/**
 * @description - Removes token from local storage
 * @returns {*} object
 */
export const signout = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
