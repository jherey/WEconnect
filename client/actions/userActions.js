import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import isLoading from './loading';

/**
 * @description - Sets current user in store
 *
 * @param {*} user
 *
 * @returns {Object} user
 */
export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

/**
 * @description - Creates a new user
 *
 * @param {*} userData
 *
 * @returns { user } - Action
 */
export const signupUser = userData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('api/v1/auth/signup', userData)
    .then((res) => {
      dispatch(isLoading(false));
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
};

/**
 * @description - Login a user
 *
 * @param {*} userData
 *
 * @returns {Object} loggedin user
 */
export const signinUser = userData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('api/v1/auth/login', userData)
    .then((res) => {
      dispatch(isLoading(false));
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
};

/**
 * @description - Action to update store with users
 *
 * @param {*} users
 *
 * @returns { users } - Action
 */
export function allUsers(users) {
  return {
    type: 'ALL_USERS',
    users
  };
}

/**
 * @description - Get all users
 *
 * @returns {Object} all users
 */
export const getAllUsers = () => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get('api/v1/auth/users')
    .then((res) => {
      dispatch(isLoading(false));
      dispatch(allUsers(res.data.allUsers));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Removes token from local storage
 *
 * @returns {*} object
 */
export const signout = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
