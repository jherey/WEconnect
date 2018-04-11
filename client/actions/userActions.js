import axios from 'axios';

/**
 * @returns {Object} promise
 * @param {*} userData
 */
export function signupUser(userData) {
  return dispatch => {
    return axios.post('api/v1/auth/signup', userData);
  }
}
