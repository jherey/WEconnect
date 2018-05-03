import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import isLoading from './loading';

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
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
};

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
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
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
