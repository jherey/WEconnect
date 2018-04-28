import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { isLoading } from './loading';

/**
 * @returns {Object} promise
 * @param {*} userData
 */
export function signupUser(userData) {
  return dispatch => {
    dispatch(isLoading(true));
    return axios.post('api/v1/auth/signup', userData)
      .then(res => {
        dispatch(isLoading(false));
        const token = res.data.token;
        localStorage.setItem('token', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      })
      .catch(error => {
        dispatch(isLoading(false));
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

/**
 * @returns {Object} promise
 * @param {*} userData
 */
export function signinUser(userData) {
  return dispatch => {
    dispatch(isLoading(true));
    return axios.post('api/v1/auth/login', userData)
      .then(res => {
        dispatch(isLoading(false));
        const token = res.data.token;
        localStorage.setItem('token', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      })
      .catch(error => {
        dispatch(isLoading(false));
      });
  }
}

/**
 * @returns {Object} object
 */
export function signout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
};
