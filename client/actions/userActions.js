import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from './setAuthToken';

/**
 * @returns {Object} promise
 * @param {*} userData
 */
export function signupUser(userData) {
  return dispatch => {
    return axios.post('api/v1/auth/signup', userData);
  }
}

/**
 * @returns {Object} promise
 * @param {*} userData
 */
export function signinUser(userData) {
  return dispatch => {
    return axios.post('api/v1/auth/login', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}

/**
 * @returns {Object} promise
 * @param {*} user
 */
export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}
