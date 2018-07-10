import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  EDIT_USER,
  SET_API_STATUS,
  UPDATE_USER_FAILED,
  IMAGE_UPLOAD,
  IMAGE_ERROR_UPLOAD
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  updateUserError: [],
  isLoading: false,
  imageUrl: '',
  imageUploadError: '',
  errors: []
};

/**
 * @returns {Object} newState
 * @param {*} state
 * @param {*} action
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case IMAGE_UPLOAD:
      return {
        ...state,
        imageUrl: action.url
      };

    case IMAGE_ERROR_UPLOAD:
      return {
        ...state,
        imageUploadError: action.error
      };

    case EDIT_USER:
      return {
        ...state,
        user: action.user
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateUserError: action.errors
      };

    case SET_API_STATUS:
      return {
        ...state,
        isLoading: action.status
      };

    default:
      return state;
  }
};
