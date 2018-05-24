import axios from 'axios';

/**
 * @description - Sets token to headers
 * @param {*} token
 * @returns {string} token
 */
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
