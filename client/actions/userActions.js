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

export function setProgress(progress) {
  return {
    type: 'SET_PROGRESS',
    progress
  };
}

export function userPicture(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ugio7gfd");
  formData.append("api_key", "195434429557533");

  return dispatch => {
    return axios.post('https://api.cloudinary.com/v1_1/diiceprhy/image/upload', formData, {
      onUploadProgress: progressEvent => {
        const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
        dispatch(setProgress(progress));
      }
    })
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
